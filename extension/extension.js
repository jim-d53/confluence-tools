const INTERVAL = 50; // Interval in milliseconds.
const TIMEOUT  = 2500;

/**
 * Waits some intervals until a specific element is displayed.
 * @return {Promise} Returns a promise that is fulfilled when it finds a specific element.
 */
function waitForRender(selector) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);

        if (element) {
            resolve(element);
        }

        let totalWaitTime = 0;
        const intervalId  = setInterval(() => {
            if (totalWaitTime === TIMEOUT) {
                reject(new Error(`waitForRender: Couldn't find the element ${selector}`));
            }

            const element = document.querySelector(selector);
            if (!element) {
                totalWaitTime += INTERVAL;
                return;
            }

            // If element is rendered, stop the interval and continue.
            clearInterval(intervalId);
            resolve(element);
        }, INTERVAL);
    });
}

let pageContentBody;

const replaceBuildNumberButton            = document.createElement('button');
replaceBuildNumberButton.style.fontSize   = '2em';
replaceBuildNumberButton.style.background = 'red';
replaceBuildNumberButton.textContent      = 'Replace build number on this page';
replaceBuildNumberButton.addEventListener('click', () => {
    const buildNumber = prompt('What is the build number for this daily merge?');
    (function (el) {
        var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) a.push(n);
        return a;
    })(pageContentBody).forEach(({parentElement}) => {
        if (parentElement) {
            parentElement.textContent = parentElement.innerText
                .replace('BUILDNUMBER', buildNumber)
        }
    });
});

waitForRender('#content-body')
    .then(el => {
        pageContentBody = el;

        // Daily FE merge page
        if (location.pathname.indexOf('760808011') > -1) {
            pageContentBody.prepend(replaceBuildNumberButton);
        }
    });
