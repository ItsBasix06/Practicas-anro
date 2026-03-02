{
    "// --- ESTÉTICA Y SISTEMA (MANTENIDO) ---": "",
    "workbench.iconTheme": "vscode-icons",
    "vsicons.dontShowNewVersionMessage": true,
    "window.confirmSaveUntitledWorkspace": false,
    "git.enableSmartCommit": true,
    "editor.minimap.enabled": false,
    "explorer.compactFolders": false,
    "explorer.confirmDelete": false,
    "errorLens.messageEnabled": false,
    "update.showReleaseNotes": false,
    "explorer.confirmPasteNative": false,
    "python.createEnvironment.trigger": "off",
    "liveServer.settings.donotShowInfoMsg": true,

    "// --- FUENTE VICTOR MONO (MANTENIDO) ---": "",
    "editor.fontFamily": "'Fira Code', monospace",
    "editor.fontLigatures": true,
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": [
                    "comment",
                    "keyword",
                    "storage",
                    "entity.name.function",
                    "variable.language",
                    "entity.other.inherited-class"
                ],
                "settings": {
                    "fontStyle": ""
                }
            }
        ]
    },

    "// --- PRODUCTIVIDAD Y AYUDAS (REACTIVADO) ---": "",

    // 1. Sugerencias Inteligentes (IntelliSense) ACTIVADAS
    // Esto hace que al escribir te salga la lista de métodos y propiedades
    "editor.quickSuggestions": {
        "other": "on",
        "comments": "off",
        "strings": "off"
    },
    
    // 2. Activar sugerencias al escribir caracteres como '.' o '->'
    "editor.suggestOnTriggerCharacters": true,
    "terminal.integrated.suggest.suggestOnTriggerCharacters": true,
    
    // 3. Mostrar información de los parámetros al escribir una función
    "editor.parameterHints.enabled": true,
    
    // 4. Mostrar snippets y sugerencias
    "editor.snippetSuggestions": "inline",
    "editor.wordBasedSuggestions": "matchingDocuments",
    "editor.suggest.preview": true,
    "editor.acceptSuggestionOnEnter": "on",
    "editor.tabCompletion": "on",

    // 5. Cierre automático de paréntesis y comillas (Más cómodo)
    "editor.autoClosingBrackets": "always",
    "editor.autoClosingQuotes": "always",
    "editor.autoSurround": "languageDefined",

    // 6. Cierre automático de etiquetas HTML/PHP
    "html.autoClosingTags": true,
    "javascript.autoClosingTags": true,
    "typescript.autoClosingTags": true,
    "php.suggest.basic": true,

    // 7. Emmet (Atajos HTML) Reactivado
    "emmet.showExpandedAbbreviation": "always",
    "emmet.triggerExpansionOnTab": true,
    "liveshare.comments": false,
    "emmet.includeLanguages": {
        "django-html": "html"
    },
    "explorer.fileNesting.patterns": {
        "*.ts": "${capture}.js",
        "*.js": "${capture}.js.map, ${capture}.min.js, ${capture}.d.ts",
        "*.jsx": "${capture}.js",
        "*.tsx": "${capture}.ts",
        "tsconfig.json": "tsconfig.*.json",
        "package.json": "package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb, bun.lock",
        "*.sqlite": "${capture}.${extname}-*",
        "*.db": "${capture}.${extname}-*",
        "*.sqlite3": "${capture}.${extname}-*",
        "*.db3": "${capture}.${extname}-*",
        "*.sdb": "${capture}.${extname}-*",
        "*.s3db": "${capture}.${extname}-*"
    },
    "terminal.integrated.initialHint": false,
    "workbench.colorTheme": "SynthWave '84",
    "workbench.colorCustomizations": {
    "[SynthWave '84]": {
        "editor.background": "#191622", 
        "sideBar.background": "#15121e",
        "activityBar.background": "#15121e" 
    }
},
"files.autoSave": "afterDelay",
"github.copilot.enable": {
    "*": false
}
}