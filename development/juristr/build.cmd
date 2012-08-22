@echo off

cd ..
call js.bat juristr\scripts\build.js
cd juristr

rem app
cp -f production.html ..\..\index.html

rem all other stuff
cp -rf ..\steal\steal.production.js ..\..\

rm -rf ..\..\resources
mkdir ..\..\resources
cp -rf resources\imgs ..\..\resources\imgs
cp -rf pages\views\projects_md.ejs ..\..\juristr\pages\views\
cp -rf pages\resources ..\..\juristr\pages

REM bootstrap resources
mkdir ..\..\juristr\resources\bootstrap\img
cp -rf resources\bootstrap\img\* ..\..\juristr\resources\bootstrap\img
