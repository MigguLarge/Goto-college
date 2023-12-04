const colleges = {
    snu: {
        name: "서울대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-02-02").toDateString(),
        moreInfo:
            "https://admission.snu.ac.kr/webdata/admission/files/2024jungsi.pdf",
        documentNeeded: "검정고시 합격증, 학생부 대체 서식(1단계 합격자)",
    },
    korea: {
        name: "고려대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-01-26").toDateString(),
        moreInfo: "https://oku.korea.ac.kr/oku/cms/FR_CON/index.do?MENU_ID=650",
        documentNeeded: "검정고시 합격증명서",
    },
    yonesei: {
        name: "연세대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-02-06").toDateString(),
        moreInfo:
            "http://admission.yonsei.ac.kr/seoul/admission/html/regular/guide.asp",
        documentNeeded: "검정고시 합격증명서",
    },
    skku: {
        name: "성균관대",
        lastSubmissionDate: new Date("2024-01-06").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-02-06").toDateString(),
        moreInfo:
            "https://admission.skku.edu/admission/html/regular/guide.html",
        documentNeeded: "입학원서, 검정고시 합격증명서",
    },
    hanyang: {
        name: "한양대",
        lastSubmissionDate: new Date("2024-01-06").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-01-26").toDateString(),
        moreInfo:
            "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_year=2024&m_type=JEONGSI",
        documentNeeded: "검정고시 합격증명서",
    },
    konkuk: {
        name: "건국대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-02-06").toDateString(),
        moreInfo:
            "http://enter.konkuk.ac.kr/submenu.do?menuurl=pNIJTWxI%2b8B8m%2bUBBAchHA%3d%3d&",
        documentNeeded: "검정고시 합격증명서",
    },
    khu: {
        name: "경희대",
        lastSubmissionDate: new Date("2024-01-06").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-01-26").toDateString(),
        moreInfo:
            "https://kr.object.gov-ncloudstorage.com/khuiphakstorage/upload/20230831041819542_2024%20jungsi%200901.pdf",
        documentNeeded: "검정고시 합격증명서",
    },
	dongguk: {
		name: "동국대",
		lastSubmissionDate: new Date("2024-01-06").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-02-06").toDateString(),
		moreInfo: "https://ipsi.dongguk.edu/upload/file/20231025105945KKX9RT.PDF",
		documentNeeded: "검정고시 합격증명서"
	},
	cau: {
		name: "중앙대",
		lastSubmissionDate: new Date("2024-01-06").toDateString(),
        successfulCandidateAnnouncementDate: new Date("2024-01-17").toDateString(),
		moreInfo: "https://admission.cau.ac.kr/submenu.do?menuurl=wvOt10B5et6zMa%2fM59G%2bxQ%3d%3d&",
		documentNeeded: "검정고시 합격증명서"
	}
};

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
        list.appendChild(listHeader);

        const name = document.createElement("span");
        listHeader.appendChild(name);
        name.textContent = "대학 이름";

        const lastSubmissionDate = document.createElement("span");
        listHeader.appendChild(lastSubmissionDate);
        lastSubmissionDate.textContent = "접수 마감일";

		const successfulCandidateAnnouncementDate = document.createElement("span");
		listHeader.appendChild(successfulCandidateAnnouncementDate);
		successfulCandidateAnnouncementDate.textContent = "합격자 발표일";

        for (const college in collegesJSON) {
            const listItem = document.createElement("li");
            list.appendChild(listItem);
            listItem.setAttribute(
                "onclick",
                `container.innerHTML = renderCollegeDetail(${colleges}, "${college}")`
            );
			listItem.classList.add("clickable");

            const collegeName = document.createElement("span");
            listItem.appendChild(collegeName);
            collegeName.textContent = collegesJSON[college].name;

            const collegeLastSubmissionDate = document.createElement("span");
            listItem.appendChild(collegeLastSubmissionDate);
            collegeLastSubmissionDate.textContent =
                collegesJSON[college].lastSubmissionDate;

			const collegeSuccessfulCandidateAnnouncementDate = document.createElement("span");
			listItem.appendChild(collegeSuccessfulCandidateAnnouncementDate);
			collegeSuccessfulCandidateAnnouncementDate.textContent = collegesJSON[college].successfulCandidateAnnouncementDate;

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
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				border-bottom: 1px solid black;
				padding: 1rem 0;
			}

			li span {
				margin: 0 1rem;
			}

			.clickable {
				cursor: pointer;
			}
			
			.clickable:hover {
				background-color: rgb(90, 115, 145);
				color: white;
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

        const wrapper = document.createElement("ul");
        shadow.appendChild(wrapper);
        wrapper.classList.add("wrapper");

        const collegeName = document.createElement("li");
        wrapper.appendChild(collegeName);
        collegeName.classList.add("college-name");
		collegeName.innerHTML = `<span>대학 이름</span><span>${collegeJSON.name}</span>`

        const collegeLastSubmissionDate = document.createElement("li");
        wrapper.appendChild(collegeLastSubmissionDate);
        collegeLastSubmissionDate.classList.add("college-last-submission-date");
		collegeLastSubmissionDate.innerHTML = `<span>접수 마감일</span><span>${collegeJSON.lastSubmissionDate}</span>`

		const successfulCandidateAnnouncementDate = document.createElement("li");
		wrapper.appendChild(successfulCandidateAnnouncementDate);
		successfulCandidateAnnouncementDate.classList.add("succesful-candidate-anoucement-date");
		successfulCandidateAnnouncementDate.innerHTML = `<span>합격자 발표일</span><span>${collegeJSON.successfulCandidateAnnouncementDate}</span>`

        const documentNeeded = document.createElement("li");
        wrapper.appendChild(documentNeeded);
        documentNeeded.classList.add("document-needed");
		documentNeeded.innerHTML = `<span>합격자 발표일</span><span>${collegeJSON.successfulCandidateAnnouncementDate}</span>`

        const collegeDetail = document.createElement("li");
        wrapper.appendChild(collegeDetail);
        collegeDetail.classList.add("college-detail");
        collegeDetail.classList.add("clickable");
		collegeDetail.innerHTML = `<span>더 알아보기</span><span>공식 사이트로 가기</span>`
		collegeDetail.setAttribute("onclick", `window.open('${collegeJSON.moreInfo}', '_blank')`)

        const goBack = document.createElement("li");
        wrapper.appendChild(goBack);
        goBack.classList.add("go-back");
        goBack.classList.add("clickable");
        goBack.setAttribute(
            "onclick",
            `container.innerHTML = renderCollegeList(${colleges})`
        );
		goBack.innerHTML = `<span>돌아가기</span><span>대학 목록</span>`


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
			
			.clickable:hover {
				background-color: rgb(90, 115, 145);
				color: white;
			}

			.clickable:hover > * {
				background-color: rgb(90, 115, 145);
				color: white;
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
