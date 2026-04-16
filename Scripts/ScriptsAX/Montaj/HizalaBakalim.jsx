/*
Script: PathAligner.jsx
Açıklama: Objeleri PATH sınırlarına göre yan yana veya alt alta dizer, çizgileri hesaba KATMAZ.
*/

(function() {
    if (app.documents.length === 0 || app.activeDocument.selection.length < 2) {
        alert("En az 2 obje seç.");
        return;
    }

    // --- Yön seçim dialogu ---
    var dialog = new Window("dialog", "Hizalama Yönü");
    dialog.orientation = "column";
    dialog.alignChildren = "fill";

    var btnGroup = dialog.add("group");
    btnGroup.orientation = "row";
    btnGroup.alignment = "center";

    var btnYatay   = btnGroup.add("button", undefined, "⟷  Yatay");
    var btnDikey   = btnGroup.add("button", undefined, "↕  Dikey");
    var btnIptal   = btnGroup.add("button", undefined, "İptal");

    var direction = null;

    btnYatay.onClick = function() { direction = "horizontal"; dialog.close(); };
    btnDikey.onClick = function() { direction = "vertical";   dialog.close(); };
    btnIptal.onClick = function() { dialog.close(); };

    dialog.show();

    if (!direction) return;

    // --- Objeleri topla ---
    var selection = app.activeDocument.selection;
    var items = [];
    for (var i = 0; i < selection.length; i++) {
        items.push(selection[i]);
    }

    if (direction === "horizontal") {
        // Soldan sağa sırala
        items.sort(function(a, b) {
            return a.geometricBounds[0] - b.geometricBounds[0];
        });

        for (var i = 1; i < items.length; i++) {
            var prevRight  = items[i - 1].geometricBounds[2]; // Öncekinin SAĞ kenarı
            var currentLeft = items[i].geometricBounds[0];    // Şimdikinin SOL kenarı
            var gap = currentLeft - prevRight;
            items[i].left -= gap;
        }

    } else if (direction === "vertical") {
        // Yukarıdan aşağıya sırala (geometricBounds[1] = top, Illustrator'da büyük = yukarı)
        items.sort(function(a, b) {
            return b.geometricBounds[1] - a.geometricBounds[1];
        });

        for (var i = 1; i < items.length; i++) {
            var prevBottom  = items[i - 1].geometricBounds[3]; // Öncekinin ALT kenarı
            var currentTop  = items[i].geometricBounds[1];     // Şimdikinin ÜST kenarı
            var gap = currentTop - prevBottom;
            items[i].top -= gap;
        }
    }

})();