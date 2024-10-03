// Function to disable right-click context menu
function disableContextMenu() {
    document.addEventListener('contextmenu', function (e) {
        e.stopPropagation(); // Stop event propagation
    }, true);
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent the default context menu from appearing
    }, false);
}

// Function to search Google for a specific site and date range
function searchSiteByDate() {
    var domain = window.location.hostname.replace('www.', ''); // Remove 'www.' from the domain
    var startDate = '2024-08-18'; // Start date for the search
    var endDate = '2024-09-18';   // End date for the search
    var query = 'site:' + domain + ' after:' + startDate + ' before:' + endDate; // Construct the query
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query); // Encode the query for the URL

    // Open the search URL in a new tab
    window.open(searchUrl, '_blank');
}

// Bookmarklet function to save the current page to Archive.org and Archive.is
function saveToArchives() {
    var currentUrl = window.location.href;
    var webArchiveUrl = "https://web.archive.org/save/" + encodeURIComponent(currentUrl);
    var archiveIsUrl = "https://archive.is/submit/?url=" + encodeURIComponent(currentUrl);

    // Open both links in new tabs
    window.open(webArchiveUrl, "_blank");
    window.open(archiveIsUrl, "_blank");
}

// Bookmarklet function for internal links
function internalLinksBookmarklet() {
    var t = window.location.hostname,
        e = document.querySelectorAll("a"),
        i = 0, n = 0, l = 0, a = "", o = "";

    e.forEach(function (e) {
        var s = e.href;
        if (s.includes(t)) {
            i++;
            var r = window.getComputedStyle(e);
            if ("none" !== r.display && "hidden" !== r.visibility && e.offsetHeight > 0 && e.offsetWidth > 0) {
                n++;
                a += `<li><a href="${s}" target="_blank">${s}</a></li>`;
            } else {
                l++;
                o += `<li>${s}</li>`;
            }
        }
    });

    var popup = window.open("", "Internal Links", "width=600,height=400");
    popup.document.write(`
        <html>
            <head>
                <title>Internal Links</title>
                <style>
                    body { font-family: sans-serif; }
                    ul { max-height: 200px; overflow-y: auto; }
                    a { word-break: break-all; }
                    .summary { font-weight: bold; }
                </style>
            </head>
            <body>
                <h2>Internal Links</h2>
                <div class="summary">
                    <p><strong>Total Internal Links:</strong> ${i}</p>
                    <p><strong>Clickable Links:</strong> ${n}</p>
                    <p><strong>Hidden Links:</strong> ${l}</p>
                </div>
                <h3>Clickable Links</h3>
                <ul>${a}</ul>
                <h3>Hidden Links</h3>
                <ul>${o}</ul>
            </body>
        </html>
    `);
}

// Function to highlight links based on their "rel" attribute
function highlightLinks() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var href = link.getAttribute("href");

        // Skip certain types of links
        if (href && href.startsWith("javascript:void(0)")) continue;
        if (href && href.startsWith("mailto:")) continue;
        if (href && href.startsWith("tel:")) continue;

        var rel = link.getAttribute("rel");
        // Highlight based on "rel" attribute
        if (rel && rel.includes("nofollow")) {
            link.style.backgroundColor = "rgba(255,0,0,0.2)"; // Red for nofollow
            link.style.border = "2px solid red";
            link.style.padding = "2px";
        } else {
            link.style.backgroundColor = "rgba(0,255,0,0.2)"; // Green for others
            link.style.border = "2px solid green";
            link.style.padding = "2px";
        }
    }
}

// Function to find and display naked URLs
function displayNakedUrls() {
    var links = document.querySelectorAll('a[href]'), nakedUrls = [];
    links.forEach(function (link) {
        var href = link.getAttribute('href'), text = link.textContent.trim();
        if (href === text) {
            nakedUrls.push(href);
        }
    });

    var popup = window.open('', '', 'width=500,height=300,scrollbars=yes');
    popup.document.write('<html><head><title>Naked URLs</title></head><body><h2>Naked URLs on this Page</h2>');

    if (nakedUrls.length > 0) {
        nakedUrls.forEach(function (url) {
            popup.document.write('<p>' + url + '</p>');
        });
    } else {
        popup.document.write('<p>No naked URLs found on this page.</p>');
    }

    popup.document.write('</body></html>');
}

// Function to find the contact page
function findContactPage() {
    const keywords = [
        'contact', 'contact us', 'get in touch', 'reach out', 'support',
        'customer service', 'help', 'inquiries', 'contact information',
        'send us a message', 'feedback', 'service desk', 'assistance'
    ];
    const links = document.querySelectorAll('a');

    for (let link of links) {
        const href = link.href.toLowerCase();
        if (keywords.some(keyword => href.includes(keyword))) {
            return href;
        }
    }

    return null;
}

// Function to open the contact page
function openContactPage() {
    const contactPage = findContactPage();
    if (contactPage) {
        window.open(contactPage, '_blank');
        alert('Contact page found: ' + contactPage);
    } else {
        alert('No contact page found.');
    }
}

// Function to display heading tags and counts
function displayHeadingTags() {
    var e = window.open("", "Heading Tags", "width=600,height=400");
    e.document.write('<html><head><title>Heading Tags</title></head><body><h2>Heading Tags and Counts</h2><div id="headingList"></div><h3>Tag Counts:</h3><ul id="headingCounts"></ul></body></html>');

    var n = e.document,
        t = n.getElementById("headingList"),
        a = n.getElementById("headingCounts"),
        i = document.querySelectorAll("h1,h2,h3,h4,h5,h6"),
        l = { H1: 0, H2: 0, H3: 0, H4: 0, H5: 0, H6: 0 },
        c = { H1: "lightcoral", H2: "lightblue", H3: "lightgreen", H4: "lightyellow", H5: "lightpink", H6: "lightgrey" };

    ["H1", "H2", "H3", "H4", "H5", "H6"].forEach(function (d) {
        var count = l[d] = [...i].filter(e => e.tagName === d).length;
        if (count > 0) {
            var r = document.createElement("li");
            r.innerHTML = `<strong>${d}</strong> - (${count})`;
            a.appendChild(r);
            t.innerHTML += `<strong>${d}:</strong><br>`;
            [...i].filter(e => e.tagName === d).forEach(function (e) {
                e.style.backgroundColor = c[d];
                t.innerHTML += `${e.innerText}<br>`;
            });
        }
    });
}

// Function to check the canonical URL
function checkCanonicalUrl() {
    var e = document.querySelector('link[rel="canonical"]'),
        n = window.location.href,
        o = window.open("", "Canonical Check", "width=400,height=250");

    o.document.open();
    o.document.write("<!DOCTYPE html><html><head><title>Canonical Check</title></head><body><h2>Canonical Check</h2><p><strong>Current page URL:</strong> " + n + "</p>");

    if (e) {
        o.document.write("<p style='color:" + (e.href === n ? "green" : "red") + ";'><strong>Canonical URL:</strong> " + e.href + "</p>");
    } else {
        o.document.write("<p style='color:red;'><strong>Canonical URL:</strong> No canonical tag found on this page.</p>");
    }

    o.document.write("</body></html>");
    o.document.close();
}

function parseLocalizedNumber(input) {
    let normalized;
    input = input.replace(/\u00A0/g, ' ');
    if (input.includes(',') && input.includes('.')) {
        if (input.indexOf(',') > input.indexOf('.')) {
            normalized = input.replace(/\./g, '').replace(/,/g, '.');
        } else {
            normalized = input.replace(/,/g, '');
        }
    } else if (input.includes(',') && input.includes(' ')) {
        normalized = input.replace(/\s/g, '').replace(/,/g, '.');
    } else if (input.includes(' ') && !input.includes(',')) {
        normalized = input.replace(/\s/g, '');
    } else if (input.includes(',')) {
        const commaIndex = input.lastIndexOf(',');
        if (input.length - commaIndex === 4 && !input.includes('.')) {
            normalized = input.replace(/,/g, '');
        } else {
            normalized = input.replace(/,/g, '.');
        }
    } else if (input.includes('.')) {
        const periodIndex = input.lastIndexOf('.');
        if (input.length - periodIndex === 3 || input.length - periodIndex === 2) {
            normalized = input;
        } else {
            normalized = input.replace(/\./g, '');
        }
    } else {
        normalized = input;
    }
    return parseFloat(normalized);
}

function extractData(label) {
    const elements = Array.from(document.querySelectorAll(`[data-label="${label}"] .nnLLaf`))
        .filter(el => el.offsetParent !== null);
    if (elements.length < 2) {
        return { current: 0, previous: 0 };
    }
    const current = parseLocalizedNumber(elements[0].getAttribute('title'));
    const previous = parseLocalizedNumber(elements[1].getAttribute('title'));
    return { current, previous };
}

function calculatePercentageChange(previous, current) {
    return ((current - previous) / previous) * 100;
}

function calculateDifference(previous, current) {
    return current - previous;
}

function addPercentageChange() {
    document.querySelectorAll('.percentage-change').forEach(element => element.remove());

    const clicksData = extractData('CLICKS');
    const impressionsData = extractData('IMPRESSIONS');
    const ctrData = extractData('CTR');
    const positionData = extractData('POSITION');

    const percentageChanges = {
        clicks: calculatePercentageChange(clicksData.previous, clicksData.current).toFixed(2),
        impressions: calculatePercentageChange(impressionsData.previous, impressionsData.current).toFixed(2),
        ctr: calculatePercentageChange(ctrData.previous, ctrData.current).toFixed(2),
        position: calculateDifference(positionData.previous, positionData.current).toFixed(2)
    };

    const metrics = [
        { label: 'CLICKS', change: percentageChanges.clicks, isPercentage: true },
        { label: 'IMPRESSIONS', change: percentageChanges.impressions, isPercentage: true },
        { label: 'CTR', change: percentageChanges.ctr, isPercentage: true },
        { label: 'POSITION', change: percentageChanges.position, isPercentage: false }
    ];

    metrics.forEach(metric => {
        const metricElements = Array.from(document.querySelectorAll(`[data-label="${metric.label}"] .m10vVd`))
            .filter(el => el.offsetParent !== null);

        if (metricElements.length > 1) {
            const latestMetricElement = metricElements[metricElements.length - 1];
            const percentageElement = document.createElement('div');
            percentageElement.classList.add('percentage-change');
            percentageElement.style.fontSize = '15px';
            percentageElement.style.fontWeight = 'bold';
            percentageElement.style.marginTop = '10px';
            percentageElement.style.color = 'inherit';

            const changeText = document.createElement('span');
            changeText.textContent = 'Change: ';
            const changeValue = document.createElement('span');
            changeValue.textContent = metric.change + (metric.isPercentage ? '%' : '');
            changeValue.style.border = '2px solid';
            changeValue.style.borderColor = (metric.label === 'POSITION')
                ? (parseFloat(metric.change) < 0 ? 'green' : 'red')
                : (metric.change.startsWith('-') ? 'red' : 'green');
            changeValue.style.padding = '2px';
            changeValue.style.marginLeft = '5px';

            percentageElement.appendChild(changeText);
            percentageElement.appendChild(changeValue);

            const existingElement = latestMetricElement.querySelector('.percentage-change');
            if (existingElement) {
                existingElement.remove();
            }

            latestMetricElement.appendChild(percentageElement);
        }
    });
}

function checkForChanges() {
    addPercentageChange();
}

function initPercentageChangeFeature() {
    checkForChanges();
}

// Function to check for "noindex" tag on the page
function checkNoindexTag() {
    var popup = window.open("", "noindexCheck", "width=300,height=200");
    popup.document.write("<html><head><title>Noindex Check</title></head><body></body></html>");
    popup.document.close();

    var metaTags = document.getElementsByTagName("meta");
    var noindexPresent = false;

    for (var i = 0; i < metaTags.length; i++) {
        var meta = metaTags[i];
        if (meta.getAttribute("name") === "robots" && meta.getAttribute("content").includes("noindex")) {
            noindexPresent = true;
            break;
        }
    }

    if (noindexPresent) {
        popup.document.body.innerHTML = "<h2 style='color: red;'>Noindex tag is present</h2>";
    } else {
        popup.document.body.innerHTML = "<h2 style='color: green;'>Noindex tag is NOT present</h2>";
    }
}

// Function to find and display outgoing links
function outgoingLinksBookmarklet() {
    var l = document.querySelectorAll('a[href]'),
        d = window.location.hostname,
        o = [];

    l.forEach(function (a) {
        var h = a.getAttribute('href');
        if (h.startsWith('http') && !h.includes(d)) {
            o.push(h);
        }
    });

    var m = 'Number of outgoing links: ' + o.length + '\n\n';
    m += o.length > 0 ? 'Outgoing links:\n' + o.join('\n') : 'No outgoing links found.';

    var p = window.open('', 'OutgoingLinksPopup', 'width=600,height=400');
    p.document.write('<html><head><title>Outgoing Links</title></head><body><pre>' + m + '</pre></body></html>');
    p.document.close();
}

// Function to fetch and display DNS records
function fetchDNSRecords() {
    var popup = window.open("", "dnsInfo", "width=400,height=300");
    popup.document.write("<html><head><title>DNS Records</title></head><body><h2>Fetching DNS Records...</h2></body></html>");
    popup.document.close();

    var domain = window.location.hostname;

    // Update popup with the domain name
    popup.document.body.innerHTML = "<h2>DNS Records for: " + domain + "</h2>";

    // Fetch A Record
    fetch("https://dns.google.com/resolve?name=" + domain + "&type=A")
        .then(response => response.json())
        .then(data => {
            var aRecord = data.Answer ? data.Answer.map(record => record.data).join("<br>") : "No A record found";
            popup.document.body.innerHTML += "<h3>A Record:</h3><p>" + aRecord + "</p>";
        });

    // Fetch CNAME Record
    fetch("https://dns.google.com/resolve?name=" + domain + "&type=CNAME")
        .then(response => response.json())
        .then(data => {
            var cnameRecord = data.Answer ? data.Answer.map(record => record.data).join("<br>") : "No CNAME record found";
            popup.document.body.innerHTML += "<h3>CNAME Record:</h3><p>" + cnameRecord + "</p>";
        });

    // Fetch TXT Record
    fetch("https://dns.google.com/resolve?name=" + domain + "&type=TXT")
        .then(response => response.json())
        .then(data => {
            var txtRecord = data.Answer ? data.Answer.map(record => record.data).join("<br>") : "No TXT record found";
            popup.document.body.innerHTML += "<h3>TXT Record:</h3><p>" + txtRecord + "</p>";
        });
}

// Function to calculate word count and estimated reading time
function displayWordCount(wpm = 200) {
    // Get the selected text or the entire document body if no text is selected
    const selection = window.getSelection().toString().trim();
    const text = selection ? selection : document.body.innerText;
    const totalWords = text.split(/\s+/).length; // Count words
    const estimatedTime = Math.ceil(totalWords / wpm); // Calculate estimated reading time

    // Create and open a popup to display the results
    const popup = window.open("", "Word Count", "width=300,height=200");
    popup.document.write(`
        <html>
            <head>
                <title>Word Count</title>
            </head>
            <body>
                <h2>Word Count: ${totalWords}</h2>
                <h3>Estimated Reading Time: ${estimatedTime} minutes</h3>
                <button onclick="window.close()">Close</button>
            </body>
        </html>
    `);
    popup.document.close();
}

// Function to open the sitemap URL of the current domain
function openSitemap() {
    var domain = window.location.hostname; // Get the current domain
    var sitemapUrl = 'https://' + domain + '/sitemap.xml'; // Construct the sitemap URL
    window.open(sitemapUrl, '_blank'); // Open the sitemap URL in a new tab
}

// Function to fetch and display meta data in a popup
function displayMetaData() {
    var metaTags = document.getElementsByTagName('meta'); // Get all meta tags
    var title = document.title; // Get the document title
    var metaInfo = {}; // Initialize an object to hold meta information

    // Set the title in the metaInfo object
    metaInfo['Title'] = (title ? title : '<span style="color:red;">NOT FOUND</span>');

    // Iterate through all meta tags
    for (var i = 0; i < metaTags.length; i++) {
        var metaTag = metaTags[i];
        var name = metaTag.getAttribute('name') || metaTag.getAttribute('property'); // Get the name or property attribute
        var content = metaTag.getAttribute('content'); // Get the content attribute

        // If the name exists, store it in the metaInfo object
        if (name) {
            metaInfo[name.replace(/:/g, ' ')] = content || '<span style="color:red;">NOT FOUND</span>';
        }
    }

    // Define headings to be displayed
    var headings = [
        'viewport', 'description', 'robots',
        'og locale', 'og type', 'og title',
        'og description', 'og url', 'og site_name',
        'og updated_time', 'og image', 'og image secure_url',
        'og image width', 'og image height', 'og image alt',
        'og image type', 'article published_time', 'article modified_time',
        'twitter card', 'twitter title', 'twitter description',
        'twitter image', 'twitter label1', 'twitter data1',
        'twitter label2', 'twitter data2'
    ];

    // Prepare the output HTML
    var output = '<html><head><title>Meta Data</title></head><body><pre>';
    headings.forEach(function (h) {
        output += '<b>' + h + ':</b> ' + (metaInfo[h] || '<span style="color:red;">NOT FOUND</span>') + '\n';
    });

    // Add any other meta information not in headings
    for (var key in metaInfo) {
        if (headings.indexOf(key) < 0) {
            output += '<b>' + key + ':</b> ' + metaInfo[key] + '\n';
        }
    }
    output += '</pre></body></html>';

    // Open a new popup window and display the output
    var popup = window.open('', 'Meta Data', 'width=800,height=600');
    popup.document.write(output);
    popup.document.close();
}

// Function to fetch and display Schema markup in a popup
function displaySchemaMarkup() {
    // Function to collect JSON-LD schema data
    function collectSchemaMarkup() {
        var scripts = document.querySelectorAll('script[type="application/ld+json"]'); // Select all JSON-LD script tags
        var schemaData = []; // Initialize an array to hold the schema data

        // Iterate through the selected script tags
        scripts.forEach(function (script) {
            try {
                var jsonData = JSON.parse(script.innerText || script.textContent); // Parse the JSON
                schemaData.push(JSON.stringify(jsonData, null, 2)); // Push formatted JSON to the array
            } catch (error) {
                schemaData.push('Error parsing JSON'); // Handle any parsing errors
            }
        });

        return schemaData; // Return the collected schema data
    }

    // Collect the schema data
    var schemaMarkup = collectSchemaMarkup();
    var outputHTML = '<html><head><title>Schema Markup</title></head><body><h2>Schema Markup:</h2><pre>';

    // Check if any schema markup was found and format the output
    if (schemaMarkup.length > 0) {
        schemaMarkup.forEach(function (markup) {
            outputHTML += markup + '\n\n'; // Add each schema markup
        });
    } else {
        outputHTML += 'No Schema markup found.'; // No schema found message
    }

    outputHTML += '</pre></body></html>'; // Close HTML tags

    // Open a new popup window and display the output
    var popup = window.open('', 'SchemaMarkupPopup', 'width=800,height=600');
    popup.document.open();
    popup.document.write(outputHTML);
    popup.document.close();
}

// Function to search Google for a specific site
function searchSiteOnGoogle() {
    var domain = window.location.hostname; // Get the current hostname
    var query = 'site:http://' + domain; // Construct the search query
    var encodedQuery = encodeURIComponent(query); // Encode the query for the URL

    // Open a new window with the Google search results for the site
    window.open('https://www.google.com/search?q=' + encodedQuery, '_blank');
}

// Function to display text content and links from the current webpage
function displayTextAndLinks() {
    var textContent = document.body.innerText; // Get the text content of the body
    var links = document.querySelectorAll('a'); // Get all anchor tags
    // Map over the links to create an array of link texts and URLs
    var linkText = Array.from(links).map(function (link) {
        return link.href + ' (' + link.innerText + ')';
    }).join('\n'); // Join the array into a single string separated by newlines

    // Create the alert content
    var alertContent = 'Text Content:\n\n' + textContent + '\n\nLinks:\n\n' + linkText;

    // Display the alert with the content
    alert(alertContent);
}

// Function to check for "Lorem Ipsum" on the page and search if not found
function checkForLoremIpsum() {
    var url = window.location.hostname; // Get the hostname of the current URL
    var foundLoremIpsum = document.body.innerText.toLowerCase().includes('lorem ipsum'); // Check for "lorem ipsum" in the body text

    if (foundLoremIpsum) {
        alert('Lorem Ipsum found on this page!'); // Alert if "Lorem Ipsum" is found
    } else {
        var googleSearchUrl = 'https://www.google.com/search?q=site:' + url + ' "lorem ipsum"'; // Create Google search URL
        window.open(googleSearchUrl, '_blank'); // Open the search URL in a new tab
    }
}

// Function to display the HTML lang attribute in a popup
function showHtmlLang() {
    // Function to create and display the popup
    function createPopup() {
        // Get the lang attribute from the document's root element or set a default message
        var langAttribute = document.documentElement.lang || "No lang attribute found";

        // Open a new popup window
        var popup = window.open("", "HTML Lang", "width=400,height=200").document;

        // Write the initial HTML structure into the popup
        popup.write(`
            <html>
                <head>
                    <title>HTML Lang</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        #lang { color: blue; font-size: 20px; }
                        #noLang { color: red; font-size: 20px; }
                    </style>
                </head>
                <body>
                    <h2>HTML Lang Attribute</h2>
        `);

        // Create a paragraph element to display the lang attribute
        var langElement = popup.createElement("p");
        langElement.id = langAttribute === "No lang attribute found" ? "noLang" : "lang";
        langElement.textContent = "Lang: " + langAttribute;

        // Append the paragraph to the popup body
        popup.body.appendChild(langElement);

        // Close the popup document
        popup.write("</body></html>");
        popup.close();
    }

    // Set a timeout to call the createPopup function after 1 second
    setTimeout(createPopup, 1000);
}

// Function to fetch and display the contents of robots.txt in a popup
function fetchRobotsTxt() {
    // Construct the URL for the robots.txt file
    var robotsUrl = window.location.origin + '/robots.txt';

    // Fetch the contents of the robots.txt file
    fetch(robotsUrl)
        .then(response => response.text())
        .then(text => {
            // Open a new popup window to display the robots.txt contents
            var popup = window.open('', 'robotsTxtPopup', 'width=400,height=400');
            popup.document.write('<pre>' + text + '</pre>');
            popup.document.title = 'robots.txt'; // Set the title of the popup
        })
        .catch(() => {
            // Show an alert if there's an error fetching the robots.txt file
            alert('Error fetching robots.txt');
        });
}

// Function to fetch WHOIS data based on user-provided domain name
function fetchWhoisData() {
    // Prompt the user to enter a domain name
    var domain = prompt("Enter domain name:");

    // Proceed only if a domain name was entered
    if (domain) {
        // Fetch WHOIS data from the specified Google Apps Script endpoint
        fetch("https://script.google.com/macros/s/AKfycbz_NnxteMRZcoN1XKRsGXoPFpiEERtCI8YeGL4-hrSesukAyvaJzJao9FNNUuRCfKWerw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ domain: domain })
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Open a new popup window to display the WHOIS data
                var popup = window.open("", "", "width=600,height=400");
                popup.document.write("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
                popup.document.title = "WHOIS Data"; // Set the title of the popup
            })
            .catch(error => {
                // Alert the user if there was an error fetching the data
                alert("Error fetching WHOIS data: " + error);
            });
    }
}

// Function to extract and display Google SERP URLs
function extractSerpUrls() {
    // Open a new window to display the extracted SERP URLs
    var popup = window.open("", "Google SERP URLs", "width=600,height=400");

    // Write the initial HTML structure to the popup
    popup.document.write(`
        <html>
            <head>
                <title>Extracted SERP URLs</title>
            </head>
            <body>
                <h2>Google SERP URLs</h2>
                <h3>Organic Results (Top 10)</h3>
                <ul id="organicList"></ul>
                <h3>Shopping Results</h3>
                <ul id="shoppingList"></ul>
                <h3>Sponsored Results</h3>
                <ul id="sponsoredList"></ul>
            </body>
        </html>
    `);

    var doc = popup.document;
    var organicList = doc.getElementById("organicList");
    var shoppingList = doc.getElementById("shoppingList");
    var sponsoredList = doc.getElementById("sponsoredList");

    // Select relevant links from the current page
    var organicLinks = Array.from(document.querySelectorAll('a[href^="http"]:not([href*="aclk"]):not([href*="/ads"]):not([href*="shopping"]):not([href*="google.com"])'));
    var shoppingLinks = document.querySelectorAll('a[href*="shopping"]');
    var sponsoredLinks = document.querySelectorAll('a[href*="/aclk"], a[href*="/ads"]');

    // Function to clean the URL by removing hash and search parameters
    function cleanUrl(url) {
        var urlObj = new URL(url);
        urlObj.hash = "";
        urlObj.search = "";
        return urlObj.href;
    }

    // Function to append links to the respective lists in the popup
    function appendLinks(list, links, limit = null, addTextContent = false) {
        let count = 0;
        links.forEach(function (link) {
            if (limit && count >= limit) return; // Limit the number of items added
            var listItem = doc.createElement("li");
            if (addTextContent && link.textContent.trim()) {
                listItem.textContent = link.textContent.trim().split(" ")[0] + " - " + cleanUrl(link.href);
            } else {
                listItem.textContent = cleanUrl(link.href);
            }
            list.appendChild(listItem);
            count++;
        });
    }

    // Append the organic, shopping, and sponsored links to the lists
    appendLinks(organicList, organicLinks, 10); // Limit to top 10 organic results
    appendLinks(shoppingList, shoppingLinks);
    appendLinks(sponsoredList, sponsoredLinks, null, true);
}

// Function to display alt text overlays for images on the page
function displayAltTextOverlays() {
    // Remove existing alt text overlays if any
    document.querySelectorAll('.alt-text-overlay').forEach(function (el) {
        el.remove();
    });

    // Select all images on the page
    var images = document.querySelectorAll('img');

    // Iterate through each image to create an overlay with its alt text
    images.forEach(function (img) {
        // Get the alt text or default to '[No Alt Text]'
        var altText = img.getAttribute('alt') || '[No Alt Text]';

        // Create a new overlay element
        var overlay = document.createElement('div');
        overlay.className = 'alt-text-overlay';
        overlay.textContent = altText;

        // Set styles for the overlay
        overlay.style.position = 'absolute';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.color = 'white';
        overlay.style.padding = '8px';
        overlay.style.fontSize = '14px';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.zIndex = '1000';
        overlay.style.maxWidth = '300px';
        overlay.style.wordWrap = 'break-word';
        overlay.style.pointerEvents = 'none'; // Make overlay non-interactive

        // Function to position the overlay correctly over the image
        function positionOverlay() {
            var rect = img.getBoundingClientRect();
            overlay.style.top = window.scrollY + rect.top + 'px';
            overlay.style.left = window.scrollX + rect.left + 'px';
            overlay.style.width = rect.width + 'px';
        }

        // Initial position of the overlay
        positionOverlay();

        // Update the position on scroll and resize events
        window.addEventListener('scroll', positionOverlay);
        window.addEventListener('resize', positionOverlay);

        // Append the overlay to the body
        document.body.appendChild(overlay);
    });
}

// Function to generate an image report on the current page
function generateImageReport() {
    // Get all image tags on the page
    var imgTags = document.getElementsByTagName("img");

    // Initialize counters for different categories
    var hiddenCount = 0;
    var altCount = 0;
    var noAltCount = 0;
    var cssCount = 0;

    // Count hidden images, images with alt attributes, and images without alt attributes
    for (var i = 0; i < imgTags.length; i++) {
        var img = imgTags[i];
        var style = window.getComputedStyle(img);

        if (style.display === "none" || style.visibility === "hidden") {
            hiddenCount++;
        } else if (img.hasAttribute("alt") && img.getAttribute("alt").trim() !== "") {
            altCount++;
        } else {
            noAltCount++;
        }
    }

    // Count CSS background images
    var allElements = document.querySelectorAll("*");
    for (var j = 0; j < allElements.length; j++) {
        var element = allElements[j];
        var bgImage = window.getComputedStyle(element).backgroundImage;

        if (bgImage !== "none" && bgImage.startsWith("url(")) {
            cssCount++;
        }
    }

    // Create a popup to display the image report
    var popup = window.open("", "Image Report", "width=400,height=400");
    popup.document.write("<h3>Image Report</h3>");
    popup.document.write("<p><strong>1. Hidden Images: </strong>" + hiddenCount + "</p>");
    popup.document.write("<p><strong>2. Images with Alt: </strong>" + altCount + "</p>");
    popup.document.write("<p><strong>3. Images without Alt: </strong>" + noAltCount + "</p>");
    popup.document.write("<p><strong>4. CSS Images: </strong>" + cssCount + "</p>");
    popup.document.write("<p><strong>Total Images: </strong>" + (hiddenCount + altCount + noAltCount + cssCount) + "</p>");
    popup.document.close();
}

// Function to display link information from the current webpage
function displayLinksInfo() {
    // Delay execution to allow the page to fully load
    setTimeout(function () {
        // Open a new window for displaying the link information
        var w = window.open('', 'Links Info', 'width=400,height=300');
        var d = w.document;

        // Write the initial HTML structure for the new window
        d.write('<html><head><title>Links Info</title></head><body><h2>Link Types</h2>');

        // Select all relevant link elements from the document
        var links = document.querySelectorAll('link[rel="preconnect"], link[rel="preload"], link[rel="prefetch"], link[rel="dns-prefetch"]');

        // Check if any links were found
        if (links.length === 0) {
            d.write('<p>No links found</p>');
        } else {
            // Initialize an object to hold links categorized by type
            var types = {
                'preconnect': [],
                'preload': [],
                'prefetch': [],
                'dns-prefetch': []
            };

            // Iterate through each link and categorize it by type
            links.forEach(function (link) {
                var type = link.rel;
                if (types[type] !== undefined) {
                    types[type].push(link.href);
                }
            });

            // Write the categorized link types to the document
            for (var type in types) {
                d.write('<h3>' + type.charAt(0).toUpperCase() + type.slice(1) + ': ' + types[type].length + '</h3>');
                types[type].forEach(function (href) {
                    d.write('<p>' + type + ': ' + href + '</p>');
                });
            }
        }

        // Close the document and complete the writing process
        d.write('</body></html>');
        d.close();
    }, 1000); // Set timeout for 1 second
}

// Function to open archived versions of the current webpage
function openArchivedLinks() {
    // Get the current page URL
    var url = window.location.href;

    // Open the Wayback Machine for the current URL
    window.open('https://web.archive.org/web/*/' + url, '_blank');

    // Open archive.is for the latest snapshot of the current URL
    window.open('https://archive.is/newest/' + url, '_blank');
}

// Call all your functions here
function callFunctions() {
    disableContextMenu();       // Call the function to disable the context menu
    saveToArchives();           // Call the function to save to archives
    internalLinksBookmarklet(); // Call the bookmarklet function for internal links
    searchSiteByDate();         // Call the function to search by date
    highlightLinks();           // Call the function to highlight links
    displayNakedUrls();         // Call the function to display naked URLs
    openContactPage();          // Call the function to find and open the contact page
    displayHeadingTags();       // Call the function to display heading tags
    checkCanonicalUrl();        // Call the function to check the canonical URL
    checkNoindexTag();          // Call the new Noindex check function
    initPercentageChangeFeature(); // Call the bookmarklet function for percentage changes
    outgoingLinksBookmarklet(); // Call the function to find outgoing links
    fetchDNSRecords();          // Call the function to fetch and display DNS records
    displayWordCount();         // Call the new word count function
    openSitemap();              // Call the new function to open the sitemap
    displayMetaData();          // Call the displayMetaData function to execute
    displaySchemaMarkup();      // Call the displaySchemaMarkup function to execute
    searchSiteOnGoogle();       // Call the searchSiteOnGoogle function to execute
    displayTextAndLinks();      // Call the displayTextAndLinks function to execute
    checkForLoremIpsum();       // Call the checkForLoremIpsum function to execute
    showHtmlLang();             // Call the showHtmlLang function to execute
    fetchRobotsTxt();           // Call the fetchRobotsTxt function to execute
    fetchWhoisData();           // Call the fetchWhoisData function to execute
    extractSerpUrls();          // Call the extractSerpUrls function to execute the functionality
    displayAltTextOverlays();   // Call the function to execute the functionality
    generateImageReport();      // Call the function to execute the image report generation
    displayLinksInfo();        // Call the function to execute the link information display
    openArchivedLinks();       // Call the function to open the archived links
}
// Load Bootstrap CSS
const bootstrapCssLink = document.createElement('link');
bootstrapCssLink.rel = 'stylesheet';
bootstrapCssLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
document.head.appendChild(bootstrapCssLink);

// Create Popup Function
function createPopup() {
    const popup = document.createElement('div');
    popup.className = 'modal fade';
    popup.id = 'myModal';
    popup.tabIndex = -1;
    popup.role = 'dialog';
    popup.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Function Selector</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="functionAccordion">
                        ${createFunctionButtons()}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(popup);
    $('#myModal').modal('show');
}

// Create buttons for each function
function createFunctionButtons() {
    const functions = [
        { name: 'Disable Context Menu', func: 'disableContextMenu' },
        { name: 'Save to Archives', func: 'saveToArchives' },
        { name: 'Internal Links Bookmarklet', func: 'internalLinksBookmarklet' },
        { name: 'Search Site by Date', func: 'searchSiteByDate' },
        { name: 'Highlight Links', func: 'highlightLinks' },
        { name: 'Display Naked URLs', func: 'displayNakedUrls' },
        { name: 'Open Contact Page', func: 'openContactPage' },
        { name: 'Display Heading Tags', func: 'displayHeadingTags' },
        { name: 'Check Canonical URL', func: 'checkCanonicalUrl' },
        { name: 'Check Noindex Tag', func: 'checkNoindexTag' },
        { name: 'Init Percentage Change Feature', func: 'initPercentageChangeFeature' },
        { name: 'Outgoing Links Bookmarklet', func: 'outgoingLinksBookmarklet' },
        { name: 'Fetch DNS Records', func: 'fetchDNSRecords' },
        { name: 'Display Word Count', func: 'displayWordCount' },
        { name: 'Open Sitemap', func: 'openSitemap' },
        { name: 'Display Meta Data', func: 'displayMetaData' },
        { name: 'Display Schema Markup', func: 'displaySchemaMarkup' },
        { name: 'Search Site on Google', func: 'searchSiteOnGoogle' },
        { name: 'Display Text and Links', func: 'displayTextAndLinks' },
        { name: 'Check for Lorem Ipsum', func: 'checkForLoremIpsum' },
        { name: 'Show HTML Lang', func: 'showHtmlLang' },
        { name: 'Fetch Robots.txt', func: 'fetchRobotsTxt' },
        { name: 'Fetch WHOIS Data', func: 'fetchWhoisData' },
        { name: 'Extract SERP URLs', func: 'extractSerpUrls' },
        { name: 'Display Alt Text Overlays', func: 'displayAltTextOverlays' },
        { name: 'Generate Image Report', func: 'generateImageReport' },
        { name: 'Display Links Info', func: 'displayLinksInfo' },
        { name: 'Open Archived Links', func: 'openArchivedLinks' },
    ];

    return functions.map((item, index) => `
        <div class="card">
            <div class="card-header" id="heading${index}">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                        ${item.name}
                    </button>
                </h5>
            </div>
            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#functionAccordion">
                <div class="card-body">
                    <button class="btn btn-primary" onclick="${item.func}()">Execute ${item.name}</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Call createPopup when the script is loaded
createPopup();
