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
