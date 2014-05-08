Emotion
=======

Proof of concept: voice emotion recognition

Depends on:

  * openEAR library for heavy lifting (so, actual trained classifiers to recognize various emotion spectra in human voice)
  * node-webkit for display.
  
Meant for demonstration purposes only. Running requires node-webkit and adjusting pathes.

This release is meant to use in Windows environment: 

  * it contains stripped down openEAR version with only binary and dlls left
  * ... and two small .bat scripts meant for app startup and cleanup. 'app.bat' should be located in topmost directory, 'kill.bat' in the same directory as 'package.json' and actual code.

Also, the directory structure is not clean right now - it was packaged for Windows end user and meant to hide most of files from him.

Perhaps a cleanup would be welcome right about now.
