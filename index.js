class CollegeList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const colleges = this.getAttribute("colleges");
        const collegesJSON = JSON.parse(colleges);

        const list = document.createElement("ul");

        const listHeader = document.createElement("li");
        const name = document.createElement("span");
        name.textContent = "대학 이름";
        const lastSubmissionDate = document.createElement("span");
        lastSubmissionDate.textContent = "접수 마감일";
        listHeader.appendChild(name);
        listHeader.appendChild(lastSubmissionDate);

        list.appendChild(listHeader);

        for (const college in collegesJSON) {
            const listItem = document.createElement("li");
            const collegeName = document.createElement("span");
            const collegeLastSubmissionDate = document.createElement("span");

            collegeName.classList.add("clickable");

            collegeName.textContent = collegesJSON[college].name;
            collegeLastSubmissionDate.textContent =
                collegesJSON[college].lastSubmissionDate;

            listItem.appendChild(collegeName);
            listItem.appendChild(collegeLastSubmissionDate);
            list.appendChild(listItem);

            listItem.setAttribute(
                "onclick",
                `container.innerHTML = renderCollegeDetail(${colleges}, "${college}")`
            );
        }

        const style = document.createElement("style");
        style.textContent = `
			ul {
				list-style: none;
				width: max-content;
				margin: 0 auto;
				padding: 0;
			}
			
			li {
				display: flex;
				justify-content: space-between;
			}

			li span:first-child {
				margin-right: 2em;
			}

			.clickable {
				color: rgb(90, 115, 145);
				cursor: pointer;
			}
			
			.clickable:hover {
				text-decoration: underline;
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
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const colleges = this.getAttribute("colleges");
        const collegesJSON = JSON.parse(colleges);
        const college = this.getAttribute("college");
        const collegeJSON = collegesJSON[college];

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        const collegeName = document.createElement("span");
        collegeName.classList.add("college-name");

        const collegeLastSubmissionDate = document.createElement("span");
        collegeLastSubmissionDate.classList.add("college-last-submission-date");

        const collegeDetail = document.createElement("span");
        collegeDetail.classList.add("college-detail");

        const collegeDetailLink = document.createElement("a");

        collegeDetailLink.classList.add("clickable");
        collegeDetail.appendChild(collegeDetailLink);

        const goBack = document.createElement("span");
        goBack.classList.add("go-back");
        goBack.classList.add("clickable");
        goBack.setAttribute(
            "onclick",
            `container.innerHTML = renderCollegeList(${colleges})`
        );

        collegeName.textContent = "대학 이름: " + collegeJSON.name;
        collegeLastSubmissionDate.textContent =
            "접수 마감일: " + collegeJSON.lastSubmissionDate;
        collegeDetailLink.textContent = "더 알아보기 (공식 사이트로 이동)";
        collegeDetailLink.href = collegeJSON.moreInfo;
        collegeDetailLink.target = "_blank";
        goBack.textContent = "돌아가기(대학 목록)";

        wrapper.appendChild(collegeName);
        wrapper.appendChild(collegeLastSubmissionDate);
        wrapper.appendChild(collegeDetail);
        wrapper.appendChild(goBack);

        const style = document.createElement("style");
        style.textContent = `
			.wrapper {
				display: flex;
				flex-direction: column;
				width: max-content;
				margin: 0 auto;
			}

			.clickable {
				color: rgb(90, 115, 145);
				cursor: pointer;
			}
			
			.clickable:hover {
				text-decoration: underline;
			}

			a {
				text-decoration: none;
			}			
		`;
        shadow.appendChild(wrapper);
        shadow.appendChild(style);
    }
}
customElements.define("college-detail", CollegeDetail);

const container = document.querySelector(".container");
const colleges = {
    snu: {
        name: "서울대학교",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        moreInfo: "https://admission.snu.ac.kr/undergraduate/regular/guide",
    },
    ku: {
        name: "고려대학교",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        moreInfo: "https://oku.korea.ac.kr/oku/cms/FR_CON/index.do?MENU_ID=650",
    },
	yonesei: {
		name: "연세대학교",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
		moreInfo: "http://admission.yonsei.ac.kr/seoul/admission/html/regular/guide.asp"
	}
};

const renderCollegeList = (collegeList) => {
    return `<college-list colleges='${JSON.stringify(
        collegeList
    )}'></college-list>`;
};

const renderCollegeDetail = (collegeList, collegeID) => {
    return `<college-detail colleges='${JSON.stringify(
        collegeList
    )}' college='${collegeID}'></college-detail>`;
};

container.innerHTML = renderCollegeList(colleges);
