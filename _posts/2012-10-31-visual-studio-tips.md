---
layout: post
title: "Visual Studio Tips"
description: "asdf asd fasdf "
category: bliki
tags: [ Visual Studio, tools]
reposts: ["http://dotnet.dzone.com/articles/visual-studio-tips"]
---
{% include JB/setup %}

At work, I spend a huge amount of my time working with Microsoft Technologies. As such, I also use Visual Studio. Here are some of the tipps and tricks to efficiently work with it.

## Keystrokes
Here are my preferred keystrokes. Note, keystrokes separated by a comma mean you have to use them in sequence in order to activate the command.  
They refer to VS2012 but some may also work in previous versions.

### Code Editing

<table class="table table-striped">
<thead>
    <th width="35%">Shortcut</th>
    <th>Description</th>
</thead>
<tbody>
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>K</kbd>, <kbd>Ctrl</kbd>+<kbd>D</kbd></td>
        <td>Autoformat the document, whether it is an HTML page, CS or JavaScript file</td>
    </tr>
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>K</kbd>,<kbd>C</kbd></td>
        <td>Comment the selected part</td>
    </tr>
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>K</kbd>,<kbd>U</kbd></td>
        <td>Un-comment the selected part</td>
    </tr>
</tbody>
</table>

### Code Navigation

<table class="table table-striped">
<thead>
    <th width="35%">Shortcut</th>
    <th>Description</th>
</thead>
<tbody>
    <tr>
        <td><kbd>F12</kbd></td>
        <td>Goto Definition</td>
    </tr>
    <tr>
        <td><kbd>Shift</kbd>+<kbd>F12</kbd></td>
        <td>Goto Definition</td>
    </tr>    
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>Q</kbd></td>
        <td>Place the cursor in the Quick-Launch box for then executing some menu command</td>
    </tr>
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>,</kbd></td>
        <td>Open the "Navigate to" dialog...probably the most powerful command for mouse-less navigation</td>
    </tr>
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>-</kbd></td>
        <td>Navigate backwards in the cursor position history</td>
    </tr>        
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>-</kbd></td>
        <td>Navigate forwards in the cursor position history</td>
    </tr>    
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>M</kbd>,<kbd>Ctrl</kbd>+<kbd>O</kbd></td>
        <td>Collapse to definitions</td>
    </tr>
</tbody>
</table>

### Custom mapped ###

<table class="table table-striped">
<thead>
    <th width="35%">Shortcut</th>
    <th>Description</th>
</thead>
<tbody>
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>W</kbd></td>
        <td>This is the default combination for closing windows on nearly all win apps I know, but strangely not on Visual Studio. Therefore, the first thing I do is to remap it to `File.Close`.</td>
    </tr>    
    <tr>
        <td><kbd>Ctrl</kbd>+<kbd>R</kbd>, <kbd>Ctrl</kbd>+<kbd>S</kbd></td>
        <td>Rebuild solution</td>
    </tr>
</tbody>
</table>
