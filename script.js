$(document).ready(function () {
    $("#btnDada").click(function(){
        var text = $("#txtOriginal").val();
        var isFullChaos = $("#chaosSwitch").is(':checked');
        
        if (!text.trim()) {
            $("#txtDada").html("Ingresa texto para generar el poema.");
            return;
        }
        
        var cleanText = text.replace(/[.,;]/g, "");
        cleanText = cleanText.replace(/\s+/g, " ");
        
        var lines = text.split('\n').filter(line => line.trim() !== '');
        
        var allWords = cleanText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        if (allWords.length === 0) {
            $("#txtDada").html("No se encontraron palabras válidas en el texto.");
            return;
        }       
        var availableWords = [...allWords];
        
        if (isFullChaos) {
            // FULL CHAOS: Mezclar todas las palabras aleatoriamente
            var shuffledWords = [];
            while (availableWords.length > 0) {
                var randomIndex = Math.floor(Math.random() * availableWords.length);
                shuffledWords.push(availableWords.splice(randomIndex, 1)[0]);
            }
            
            // Crear el poema con quiebres de línea aleatorios
            var poem = "";
            if (shuffledWords.length > 0) {
                // Capitalizar primera palabra
                poem = shuffledWords[0].charAt(0).toUpperCase() + shuffledWords[0].slice(1);
                
                for (var i = 1; i < shuffledWords.length; i++) {
                    if (Math.random() < 0.15) { // 15% chance de nueva línea
                        poem += ".<br>";
                        if (i < shuffledWords.length) {
                            poem += shuffledWords[i].charAt(0).toUpperCase() + shuffledWords[i].slice(1);
                        }
                    } else {
                        poem += " " + shuffledWords[i];
                    }
                }
                poem += ".";
            }
            
            $("#txtDada").html(poem);
            
        } else {
            // CHAOS: Mantener estructura de líneas pero mezclar palabras
            var newPoem = "";
            
            for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                var line = lines[lineIndex].trim();
                if (line === "") continue;
                
                // Contar palabras en la línea original
                var originalWords = line.replace(/\.|,|;|!|\?|"|'/g, "").split(/\s+/).filter(word => word.length > 0);
                var wordsNeeded = originalWords.length;
                
                
                var lineWords = [];
                for (var i = 0; i < wordsNeeded && availableWords.length > 0; i++) {
                    var randomIndex = Math.floor(Math.random() * availableWords.length);
                    lineWords.push(availableWords.splice(randomIndex, 1)[0]);
                }
                
                if (lineWords.length > 0) {
                    var newLine = lineWords[0].charAt(0).toUpperCase() + lineWords[0].slice(1);
                    for (var j = 1; j < lineWords.length; j++) {
                        newLine += " " + lineWords[j];
                    }
                    
                    newPoem += newLine + "<br>";
                }
            }
            
            $("#txtDada").html(newPoem);
        }
    });
});


$("#copyBtn").click(function () {
    var poemaHTML = $("#txtDada").html();
    
    var tempElement = document.createElement("div");
    tempElement.innerHTML = poemaHTML.replace(/<br\s*\/?>/gi, "\n");
    var plainText = tempElement.innerText;

    navigator.clipboard.writeText(plainText).then(function () {
        $("#copyMsg").fadeIn(200);
        setTimeout(function () {
            $("#copyMsg").fadeOut(200);
        }, 1500);
    }).catch(function (err) {
        alert("Error al copiar: " + err);
    });
});

