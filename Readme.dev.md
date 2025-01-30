# ExcelJS

注意，如果是在 windows 系统下开发，当你 build 之后会发现 git commit 报错：

```bash
<3>WSL (12) ERROR: CreateProcessParseCommon:763: Failed to translate E:\ProgramProjects\VScode_projects\SourceCode\exceljs
<3>WSL (12) ERROR: CreateProcessParseCommon:809: getpwuid(0) failed 2
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\app-3.4.15\resources\app\git\mingw64\libexec\git-core
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\app-3.4.15\resources\app\git\mingw64\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\app-3.4.15\resources\app\git\usr\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\app-3.4.15\resources\app\git\mingw64\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\app-3.4.15\resources\app\git\mingw64\usr\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files (x86)\VMware\VMware Workstation\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Apps\ZenTao\ZenTao\zbox\nssm\win64
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\anaconda3\condabin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Python312\Scripts
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Python312
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Windows\system32
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Windows
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Windows\System32\Wbem
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Windows\System32\WindowsPowerShell\v1.0
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Windows\System32\OpenSSH
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files\NVIDIA Corporation\NVIDIA NvDLISR
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Apps\Bandizip
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\anaconda3
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\anaconda3\Scripts
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\anaconda3\Library\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\DBMS\MongoDB\Server\7.0\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\DBMS\MongoDB\mongosh
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\ProgramData\chocolatey\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files\Microsoft SQL Server\150\Tools\Binn
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\170\Tools\Binn
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\nvm
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\nodejs
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files\dotnet
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\app-3.3.8\resources\app\git\mingw64\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\Git\cmd
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\Programs\cursor\resources\app\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\docker-compose-windows-x86_64.exe
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files\Docker\Docker\resources\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\pnpm
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Program Files\MySQL\MySQL Shell 8.0\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\Microsoft\WindowsApps
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Apps\JetBrains\PyCharm Community Edition 2023.2.4\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\DBMS\MongoDB\mongosh
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\nvm
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Dev\IDE\nodejs
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\GitHubDesktop\bin
<3>WSL (12) ERROR: UtilTranslatePathList:2852: Failed to translate C:\Users\skydt\AppData\Local\Programs\Microsoft VS Code\bin
<3>WSL (12) ERROR: CreateProcessCommon:392: getpwuid(0) failed 2
<3>WSL (12) ERROR: CreateProcessCommon:559: execvpe(/bin/bash) failed: No such file or directory
```

这是因为本项目基于 linux 系统，而且本项目的 package.json 文件中指定了:

```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "prettier-eslint --write",
      "eslint --format node_modules/eslint-friendly-formatter",
      "git add"
    ]
  },
```

这就导致当你`npm install`后再执行 git commit 命令时，会触发 husky 钩子，而 husky 钩子会执行 lint-staged 命令，而 lint-staged 命令会执行 prettier-eslint 和 eslint 命令，而这些命令都是基于 linux 系统的，所以会报上述错误。

## 找寻原因

尝试运行：

```bash
npx prettier-eslint --write .\excel.js
```

发现可以正常运行。

尝试运行：

```bash
npx eslint --format .\excel.js node_modules/eslint-friendly-formatter 
```