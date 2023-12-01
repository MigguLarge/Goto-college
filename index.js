const colleges = {
    snu: {
        name: "서울대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        moreInfo:
            "https://admission.snu.ac.kr/webdata/admission/files/2024jungsi.pdf",
        documentNeeded: "검정고시 합격증, 학생부 대체 서식(1단계 합격자)",
    },
    korea: {
        name: "고려대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        moreInfo: "https://oku.korea.ac.kr/oku/cms/FR_CON/index.do?MENU_ID=650",
        documentNeeded: "검정고시 합격증명서",
    },
    yonesei: {
        name: "연세대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        moreInfo:
            "http://admission.yonsei.ac.kr/seoul/admission/html/regular/guide.asp",
        documentNeeded: "검정고시 합격증명서",
    },
    skku: {
        name: "성균관대",
        lastSubmissionDate: new Date("2024-01-06").toDateString(),
        moreInfo:
            "https://admission.skku.edu/admission/html/regular/guide.html",
        documentNeeded: "입학원서, 검정고시 합격증명서",
    },
    hanyang: {
        name: "한양대",
        lastSubmissionDate: new Date("2024-01-06").toDateString(),
        moreInfo:
            "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_year=2024&m_type=JEONGSI",
        documentNeeded: "검정고시 합격증명서",
    },
    konkuk: {
        name: "건국대",
        lastSubmissionDate: new Date("2024-01-05").toDateString(),
        moreInfo:
            "http://enter.konkuk.ac.kr/submenu.do?menuurl=pNIJTWxI%2b8B8m%2bUBBAchHA%3d%3d&",
        documentNeeded: "검정고시 합격증명서",
    },
    khu: {
        name: "경희대",
        lastSubmissionDate: new Date("2024-01-06").toDateString(),
        moreInfo:
            "https://kr.object.gov-ncloudstorage.com/khuiphakstorage/upload/20230831041819542_2024%20jungsi%200901.pdf",
        documentNeeded: "검정고시 합격증명서",
    },
	dongguk: {
		name: "동국대",
		lastSubmissionDate: new Date("2024-01-06").toDateString(),
		moreInfo: "https://ipsi.dongguk.edu/upload/file/20231025105945KKX9RT.PDF",
		documentNeeded: "검정고시 합격증명서"
	},
	cau: {
		name: "중앙대",
		lastSubmissionDate: new Date("2024-01-06").toDateString(),
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
        const name = document.createElement("span");
        const lastSubmissionDate = document.createElement("span");

        name.textContent = "대학 이름";
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
				border-bottom: 1px solid black;
				padding: .5em 0;
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
        const collegeLastSubmissionDate = document.createElement("span");
        const documentNeeded = document.createElement("span");
        const collegeDetail = document.createElement("span");
        const collegeDetailLink = document.createElement("a");
        const goBack = document.createElement("span");

        collegeName.classList.add("college-name");
        collegeLastSubmissionDate.classList.add("college-last-submission-date");
        documentNeeded.classList.add("document-needed");
        collegeDetail.classList.add("college-detail");
        collegeDetail.appendChild(collegeDetailLink);
        collegeDetailLink.classList.add("clickable");
        goBack.classList.add("go-back");
        goBack.classList.add("clickable");
        goBack.setAttribute(
            "onclick",
            `container.innerHTML = renderCollegeList(${colleges})`
        );

        collegeName.textContent = "대학 이름: " + collegeJSON.name;
        collegeLastSubmissionDate.textContent =
            "접수 마감일: " + collegeJSON.lastSubmissionDate;
        documentNeeded.textContent = "필요 서류: " + collegeJSON.documentNeeded;
        collegeDetailLink.textContent = "더 알아보기 → 공식 사이트로 이동";
        collegeDetailLink.href = collegeJSON.moreInfo;
        collegeDetailLink.target = "_blank";
        goBack.textContent = "돌아가기 → 대학 목록";

        wrapper.appendChild(collegeName);
        wrapper.appendChild(collegeLastSubmissionDate);
        wrapper.appendChild(documentNeeded);
        wrapper.appendChild(collegeDetail);
        wrapper.appendChild(goBack);

        const style = document.createElement("style");
        style.textContent = `
			.wrapper {
				display: flex;
				flex-direction: column;
				width: max-content;
				margin: 0 auto;
				line-height: 150%;
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
