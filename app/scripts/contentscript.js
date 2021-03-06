/* globals Translitit */
'use strict';


// var translitit = Translitit;
chrome.storage.sync.get({
    useTransliterator: true
}, function(items) {
    if (items.useTransliterator) {
        window.datum = {
            orthography: '',
            transliteration: ''
        };
        window.setInterval(function() {

            var walkTheDOM = function walk(node, func) {
                func(node);
                node = node.firstChild;
                while (node) {
                    walk(node, func);
                    node = node.nextSibling;
                }
            };
            walkTheDOM(document.body, function(node) {
                if (node.nodeType === 1) {
                    // alert(node.id); // alert if we have a type 1 node
                    if (node.childElementCount === 0) {
                        var previousText = node.textContent ? node.textContent.trim() : '';
                        if (previousText) {
                            // console.log(previousText);
                            // var changedText = Tanslitit(previousText);
                            window.datum.orthography += ' ' + previousText;
                            // window.datum.transliteration += ' ' + changedText;
                            // node.innerHTML = changedText;
                            // node.title = changedText;
                        }
                    }
                }
            });
        }, 2000);
    } else {
        console.log('Transliteration is off');
    }
});
