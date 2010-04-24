// ==UserScript==
// @name            Google Image Ripper
// @namespace       http://dearcomputer.nl/gir/
// @description     No more thumbnails, straight to the good stuff! Rewrites Google Image Search results to show full images instead of the thumbnails.
// @include         http://images.google.tld/*
// @version         1.3
// ==/UserScript==

// ==CHANGELOG==
// ver 1.0 - 2008.10.13
// - initial release
//
// ver 1.1 - 2009.07.16
// - fixed after changed google image search markup
//
// ver 1.2 - 2009.12.04
// - fixed after another google markup change
// - added version number to modified title
// - improved javascript for logo DOM modification
//
// ver 1.3 - 2010.01.19
// - linked images to original hosting pages (thnx to shake & freecyber for suggestions)

var reprocess = function() {

    // expand page title
    document.title += " [ripped results by Google Image Ripper v1.3]";

    //change logo
    googleLogo = document.getElementById('logo').getElementsByTagName('img');
    googleLogo[0].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABqCAMAAAAFiQq3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAB15JREFUeNrMm4li2zgMRB///6d3m0TCNSApWY6Ttk58RCVBYDAYQIx3f3Hx0/z7+//D1+P55C99fa3p3+PP7hjHs83f/pVF8m3L739fL3w/3zsbfsULfs73XCzCPkyuxKMeSfPe6Yb82FFY8rc9sD3x8/u3Zd3OiJa9uwN/lfATbFnyiB3Ow4/XZsdvHokyHbdYhOPt6X4jW7I5jWjm+J20SuQvj4FGmMOKJ1yeoOk+zRWwuOBtiDg8fE95pPdGsx7nJ3bPlSkeUJClvKbscqaaw6YR34e8Sm8ibXUuRhcNMpH+jBPjfbTb/ttVUKJXWJLmSlimTsFrnkjASRpUQOzwii8sLUn5rHnfiUU+3Cj7VSfq47PzRuXXNf8eEVzzooGlyjjz6GYSGWs7NojY4OSJ2inijnfmuZuCiwjfQDOH9Bk0sGHRQQ0UubN8isevcNU32Yx545O21tWpUFZPtRst+tHEGl0+Mx4ZCdF7GPZN0utyDRZfn6tnmiu4dSqf/Px6cf7js82fsqTINp9m5h3LjBzu6RrQMjG3L+Diehxp6a/EdaoWj7W+E4K62iV6XHzFVwwphX+yMFxxpFrTcKOG6Px+tUhfD+QIwfQgg/THdIB5/Xav4jzY+A6HeT1u0v+TVClRufy44nsChzufQhMNQk3DDkN5WftR7DI+Oi3FSZPwtGLGPdN1ddqIu3mzphd9jxlLp2gEd+qV97K1qqDNudCBU0wqKJpTyVWNwskhsHIMFzOnkMEST9jwoab6P/WtG9F9ULdphmFSjwUH8gBYKl8adQ2prjkFNfBJXsDolVJ113MtP5qmur5SrmRH9kEQOhSiPjf755xDUkq3WBDKO1cWZLJL8jM6Vnt6omnTGzpptWT1RUK8aJsiVbDo8/iIYYGTcMO3uJBRyklZlBgGOTwX9bmMb1aaEyzWjlA9ynuYLGSauVZhmceS+tZF+VWcHF7AkCgmOF637oy1c2V3NBpROTvXyTn4JG2mWXvf1MdeYEGu9yA7YcO9XlRimTNREdByr5rDSi/I+jmTGqdTSPd7ZBW9r/mkuWO3HwI6Rs6ivdiIhOMGqW+m+CSNzn6iZKhxerXzPs9ls5qQLOgMF4X/6uz7VVP6bzvVEmQGSdH2LSe+SqS5kp6uaql+nY9VNPtVSOqza5x2PYjPyD1r2MSaUS8u0meWudDgGWLQIYWO4vjkAwrG++Zw8H2HVy15Ya6o50qZo7u8eATQU9H9vOz6gBbZ2WBnN4Wromqb0XRyf8sv0XaLfaaHLHk9c9JqCV43N/z5VWF/WeOsvcoxdavGKR0LN/Xk9QV/Rid4HErEoYYWewY+usBYQ/egbITZnKC/BS5vfK/WpgOn4i1TzGqVyR/SWn0dkx0kPi31cziDiW6wmqsg8yXfrZ9122PdVY1h3IBWc9vFCIVNoWcVlNbCLUPeShqGn5ZSVKxUAHfgg3ZqTusVoppL+3wdi+dzKejpvjhkdLzgEcMHfcPrh6o3pZoZeVLW7Qadtfwsl9Wiw0VfVhciauv463UAUsiGyq/4HdmXStznSYo0YZp03cR2Wx4/Sv8CcS5KIe2YtdnVukhSaWA2RYXqB/iByvTTLLrFGj36ZtWxofh1RM3Vlg6xR+ncmwFWc2J73Ig5KKZ5IF9JpBrEfNtvLuThqHN6JZGE8Mi5N+XQLgs4ucOYemIcqXcR1XiZ4RNHucCC0MpBiEJ3roPEk4O6HvgNsacWrc0I/rqYcaWuqCKF7PukiYORJ/EoOd8mHmOf1SP9QjgBnbtq9yTqO5U1uv1ZarFGIGHcPvW4Rq33o3LWEbu8OXotW35OcP/aXWQ0Kl7yyTZ3M/mJ4gOC3YUhFGccrcpHH2OHmRfPLWyUBq9TXsb3smadnWAJ1vP/JKaRaw9c7va5wh0eCQEQds/3qzAI1Sv0ujZDnvEkd4PmJq6al/PgTLSCXVR1wILoHgoOjeVzz8TDjDJSnRheTdPDpog6zLjCSQvtPX8i8SSJS00Kc81JYW4u4+AaOmPEotE4dX7KOsS9FaGG8xCw1JRSr+JW/YFQnxATckLPE2DBQKppbJRpTV+y3InSWTNjxRhdXebvhXDTITfGo+dzA4iYR9Qnk84webJKd7vXqlHKxtID410W5C6mvM+HWF626HVdCUNkVmRFlDtyo6lbu972vsZIOtfakQxIUO5ToaE5I7CSEm/sxkqnH6x0Z9osXOyYcxndxBSht13uDxXzL7GSS3EsKJicyyYqowTRYKUb6qkZXRuy9NdzN/XeQ4Saoud2WCnbCrnnc2lVrxxBw3NGd2cYUvQiYNh+fuUuRuWnvq3EoL0frb+vxAelF07EfY9VkRr5bir/ui/PCRV3vvoVlUFNsA85MaIn5vAV0Yh6Q2bMO3pInxUSbrspqDKN6+dJHdcbbhg/dhERpOd67q41ejNdKKo4y9HD38fifyTrauSYE7Ga+GSYuQxqls/WSQMZqheX72dxWpJV7/flbM3FemYU6yTPeSkKisfR00HGfwIMAH36NZkqaJ6BAAAAAElFTkSuQmCC";

    // Get list of all anchor tags that have an href attribute containing the start and stop key strings.
    var fullImgUrls = selectNodes(document, document.body, "//a[contains(@href,'/imgres?imgurl\x3d')][contains(@href,'\x26imgrefurl=')]");

    //clear existing markup
    var imgContent = document.getElementById('ImgContent');
    imgContent.innerHTML = "";

	    console.log("Ripped " + fullImgUrls.length + " images.");
    for(var x=1; x<=fullImgUrls.length; x++) {
        //reverse X to show images in correct order using .insertBefore imgContent.nextSibling
        var reversedX = (fullImgUrls.length) - x;
        // get url using regexp
        var fullUrl = fullImgUrls[reversedX].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=(.*?)\&usg/ );
        // if url was fetched, create img with fullUrl src
        if(fullUrl) {
            newLink = document.createElement('a');
            imgContent.parentNode.insertBefore(newLink , imgContent.nextSibling);
            newLink.href = unescape(fullUrl[2]);
            newElement = document.createElement('img');
            newElement.style['max-width'] = "100%";
            newLink.appendChild(newElement);
            newElement.src = decodeURI(fullUrl[1]);
            newElement.border = 0;
            newElement.title = fullUrl[2];
        }
    }

    function selectNodes(document, context, xpath) {
        var nodes = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = [];
        for (var x=0; x<nodes.snapshotLength; x++) {
            result.push(nodes.snapshotItem(x));
        }
        return result;
    }
    console.log("Changing to Google Image Ripper format.");

};

window.setTimeout(reprocess,500);