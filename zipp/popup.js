
let button = document.addEventListener('click', (ev) => {
	switch(ev.target.id) {
		case "b10prod":
		enterB10ProdPin();
		break;
		case "b10QA":
		enterB10QAPin();
		break;
		case "logout":
		logout();
		break;
		default:
		login(ev.target.id)
		break;
	}
});


let login = (value) => {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.executeScript(tabs[0].id, {
			code: `(function () {
				var s = document.createElement('script');
				s.setAttribute('type', 'text/javascript');
				console.log("${value}");
				s.innerHTML = 'window.Techsson.Core.Header.Login("", "' + "${value}" + '", "testtest1", undefined, undefined, undefined);'
				document.body.appendChild(s);
			})();`
		});
	})
};


let enterB10ProdPin = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(tabs[0].id, {
			code: `(function () {
				var s = document.createElement('script');
				s.setAttribute('type', 'text/javascript');
				s.innerHTML = 'document.getElementById("tbEmail").value = "b10prod01@gmail.com"; document.getElementById("tbPin").value = 8341; document.getElementById("btnValidate").click();'
				document.body.appendChild(s);
			})();`
		});
	})
};

let enterB10QAPin = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(tabs[0].id, {
			code: `(function () {
				var s = document.createElement('script');
				s.setAttribute('type', 'text/javascript');
				s.innerHTML = 'document.getElementById("tbEmail").value = "manual02@cykranosh.com"; document.getElementById("tbPin").value = 4466; document.getElementById("btnValidate").click();'
				document.body.appendChild(s);
			})();`
		});
	})
};

let logout = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(tabs[0].id, {
			code: `(function () {
				var s = document.createElement('script');
				s.setAttribute('type', 'text/javascript');
				s.innerHTML = 'window.Techsson.Core.Header.Logout(); document.location.reload();'
				document.body.appendChild(s);
			})();`
		});
	})
};