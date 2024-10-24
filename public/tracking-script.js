(function () {
    "use strict";
    const location = window.location;
    const document = window.document;
    const scriptElement = document.currentScript;
    const dataDomain = scriptElement.getAttribute("data-domain");
    let queryString = location.search
    const params = new URLSearchParams(queryString)
    const source = params.get("utm")

    const endpoint = "http://localhost:3000/api/track"

    function generateSessionId() {
        return "session-" + Math.random().toString(36).substring(2, 9)
    }

    function initializeSession() {
        let sessionId = localStorage.getItem("session_id");
        let expirationTimestamp = localStorage.getItem("session_expiration_timestamp");
        if (!sessionId || !expirationTimestamp) {
            sessionId = generateSessionId()
            expirationTimestamp = Date.now() + 10 * 60 * 1000 //+10min
            localStorage.setItem("session_id", sessionId)
            localStorage.setItem("session_expiration_timestamp", expirationTimestamp)
            trackSessionStart()
        }
        return {
            sessionId: sessionId,
            expirationTimestamp: parseInt(expirationTimestamp)
        }
    }

    function isSessionExpired(expirationTimestamp) {
        return Date.now() >= expirationTimestamp
    }

    function checkSessionStatus() {
        const session = initializeSession()
        if (isSessionExpired(session.expirationTimestamp)) {
            localStorage.removeItem("session_id");
            localStorage.removeItem("session_expiration_timestamp");
            trackSessionEnd();
            initializeSession();
        }
    }

    checkSessionStatus()

    function sendRequest(payload, options) {
        const request = new XMLHttpRequest()
        request.open("POST", endpoint, true)
        request.setRequestHeader("Content-Type", "application/json")
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                options && options.callback && options.callback()
            }
        }
        request.send(JSON.stringify(payload))
    }

    function trigger(eventName, options) {
        const payload = {
            event: eventName,
            url: location.href,
            domain: dataDomain,
            source: source
        }
        sendRequest(payload, options)
    }

    const queue = (window.your_tracking && window.your_tracking.q) || [];
    window.your_tracking = trigger;
    for (let i = 0; i < queue.length; i++) {
        trigger.apply(this, queue[i]);
    }

    function trackPageView() {
        trigger("pageview")
    }

    function trackSessionStart() {
        trigger("session_start")
    }

    function trackSessionEnd() {
        trigger("session_end")
    }

    trackPageView()
    let initialPathname = window.location.pathname
    window.addEventListener("popstate", trackPageView)
    window.addEventListener("hashchange", trackPageView)
    document.addEventListener("click", function (event) {
        setTimeout(() => {
            if (window.location.pathname !== initialPathname) {
                trackPageView()
                initialPathname = window.location.pathname
            }
        }, 3000)
    })
})