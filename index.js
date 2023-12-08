import { collegeList } from "./collegeList.js";

class CollegeList extends HTMLElement {
    constructor() {
        super();
        this.collegeList = collegeList;
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const list = document.createElement("ul");

        const listHeader = document.createElement("li");
        list.appendChild(listHeader);

        const name = document.createElement("span");
        listHeader.appendChild(name);
        name.textContent = "대학 이름";

        const lastSubmissionDate = document.createElement("span");
        listHeader.appendChild(lastSubmissionDate);
        lastSubmissionDate.textContent = "접수 마감일";

        const successfulCandidateAnnouncementDate =
            document.createElement("span");
        listHeader.appendChild(successfulCandidateAnnouncementDate);
        successfulCandidateAnnouncementDate.textContent = "합격자 발표일";

        for (const college in collegeList) {
            const listItem = document.createElement("li");
            list.appendChild(listItem);
            listItem.addEventListener("click", () => {
                renderCollegeDetail(college);
            });
            listItem.classList.add("clickable");

            const collegeName = document.createElement("span");
            listItem.appendChild(collegeName);
            collegeName.classList.add("college-name");
            collegeName.textContent = collegeList[college].name;

            const collegeLastSubmissionDate = document.createElement("span");
            listItem.appendChild(collegeLastSubmissionDate);
            collegeLastSubmissionDate.textContent =
                collegeList[college].lastSubmissionDate;

            const collegeSuccessfulCandidateAnnouncementDate =
                document.createElement("span");
            listItem.appendChild(collegeSuccessfulCandidateAnnouncementDate);
            collegeSuccessfulCandidateAnnouncementDate.textContent =
                collegeList[college].successfulCandidateAnnouncementDate;
        }

        const style = document.createElement("style");
        style.textContent = `
			ul {
				list-style: none;
				width: 100%;
				max-width: 500px;
				margin: 0 auto;
				padding: 0;
				display: grid;
				grid-template-columns: 1fr 1fr;
			}
			
			li {
				display: inline-flex;
				flex-direction: column;
				padding: 1rem;
			}

			ul li:nth-child(n+3) {
				border-top: 1px solid black;
			}

			ul li:nth-child(2n+1) {
				border-right: 1px solid black;
			}

			ul li:nth-last-child(-n+2) {
				border-bottom: 1px solid black;
			}

			.college-name {
				color: rgb(90, 115, 145);
			}

			.clickable {
				cursor: pointer;
			}
			
			@media (hover: hover) {
				.clickable:hover {
					background-color: rgb(90, 115, 145);
					color: white;
				}
				.clickable:hover > * {
					color: white;
				}
			}
		`;

        shadow.appendChild(list);
        shadow.appendChild(style);
    }
}
customElements.define("college-list", CollegeList);

class CollegeDetail extends HTMLElement {
    constructor() {
        super();
        this.collegeList = collegeList;
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });


        const college = this.getAttribute("college");
        const collegeObject = collegeList[college];

        const wrapper = document.createElement("ul");
        shadow.appendChild(wrapper);
        wrapper.classList.add("wrapper");

        const collegeName = document.createElement("li");
        wrapper.appendChild(collegeName);
        collegeName.classList.add("college-name");
        collegeName.innerHTML = `<span>대학 이름</span><span>${collegeObject.name}</span>`;

        const collegeLastSubmissionDate = document.createElement("li");
        wrapper.appendChild(collegeLastSubmissionDate);
        collegeLastSubmissionDate.classList.add("college-last-submission-date");
        collegeLastSubmissionDate.innerHTML = `<span>접수 마감일</span><span>${collegeObject.lastSubmissionDate}</span>`;

        const successfulCandidateAnnouncementDate =
            document.createElement("li");
        wrapper.appendChild(successfulCandidateAnnouncementDate);
        successfulCandidateAnnouncementDate.classList.add(
            "succesful-candidate-anoucement-date"
        );
        successfulCandidateAnnouncementDate.innerHTML = `<span>합격자 발표일</span><span>${collegeObject.successfulCandidateAnnouncementDate}</span>`;

        const documentNeeded = document.createElement("li");
        wrapper.appendChild(documentNeeded);
        documentNeeded.classList.add("document-needed");
        documentNeeded.innerHTML = `<span>합격자 발표일</span><span>${collegeObject.successfulCandidateAnnouncementDate}</span>`;

        const collegeDetail = document.createElement("li");
        wrapper.appendChild(collegeDetail);
        collegeDetail.classList.add("college-detail");
        collegeDetail.classList.add("clickable");
        collegeDetail.innerHTML = `<span>더 알아보기</span><span>공식 사이트로 가기</span>`;
        collegeDetail.setAttribute(
            "onclick",
            `window.open('${collegeObject.moreInfo}', '_blank')`
        );

        const goBack = document.createElement("li");
        wrapper.appendChild(goBack);
        goBack.classList.add("go-back");
        goBack.classList.add("clickable");
        goBack.addEventListener("click", () => {
            renderCollegeList();
        });
        goBack.innerHTML = `<span>돌아가기</span><span>대학 목록</span>`;

        const style = document.createElement("style");
        shadow.appendChild(style);
        style.textContent = `
			.wrapper {
				display: flex;
				flex-direction: column;
				width: max-content;
				margin: 0 auto;
				line-height: 150%;
				list-style: none;
				padding: 0;
			}

			li {
				display: grid;
				grid-template-columns: 1fr 1fr;
				padding: 1rem 1rem;
				border-bottom: 1px solid black
			}

			.clickable {
				color: rgb(90, 115, 145);
				cursor: pointer;
			}

			.clickable > * {
				color: rgb(90, 115, 145);
				cursor: pointer;
			}
			
			@media (hover: hover) {
				.clickable:hover {
					background-color: rgb(90, 115, 145);
					color: white;
				}

				.clickable:hover > * {
					background-color: rgb(90, 115, 145);
					color: white;
				}
			}

			a {
				text-decoration: none;
				color: black;
			}			
		`;
    }
}
customElements.define("college-detail", CollegeDetail);

const container = document.querySelector(".container");

const renderCollegeList = () => {
    container.innerHTML = "<college-list></college-list>";
};

const renderCollegeDetail = (collegeID) => {
    container.innerHTML = `<college-detail college=${collegeID}></college-detail>`;
};

container.innerHTML = "<college-list></college-list>";
