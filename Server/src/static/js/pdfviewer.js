/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Pass the embed mode option here */
const viewerConfig = {
    embedMode: "IN_LINE"
};

if (window.AdobeDC) {
    previewFile({
        content: {
            location: {
                url: "http://cre-verse.io/pdf/whitepaper.pdf",
            },
        },
        metaData: {
            fileName: "whitepaper.pdf"
        }
    }, viewerConfig);
} else {
    var adobeDCView = new AdobeDC.View({
        clientId: "f1065ee686c048229eaef8a9eaa1e3c0",
        divId: "adobe-dc-view",
    });

    document.addEventListener("adobe_dc_view_sdk.ready", () => {
        previewFile({
            content: {
                location: {
                    url: "http://cre-verse.io/pdf/whitepaper.pdf",
                },
            },
            metaData: {
                fileName: "whitepaper.pdf"
            }
        }, viewerConfi);
    });
}


