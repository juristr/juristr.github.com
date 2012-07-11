@echo off

cd ..
call js.bat juristr\scripts\build.js
cd juristr

rm -rf production
mkdir production

rem app
cp -f production.html production\index.html

rem views
rem mkdir production\jspatterns
rem cp -rf views production\jspatterns\views

rem all other stuff
mv production.css production.js production
cp -rf ..\steal\steal.production.js production
