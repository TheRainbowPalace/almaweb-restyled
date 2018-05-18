## Responsive Almaweb

Responsive Almaweb is an extension for Chrome, Firefox, Safari & Edge.
It restyles the look and feel of the [Almaweb
website](https://almaweb.uni-leipzig.de) of the University of Leipzig.
The goal is to provide a clean and easy to use design since the current on (May 2018) is arguably not perfect.

#### Development Installation

Download the latest release inside the 'releases' folder and unzip the file. It contains the extensions for each browser.  
After you are done installing, you can delete the folder.

**Safari**
- Open Safari
- Menu Bar -> Safari -> Preferences -> Advanced
- Activate 'Show Develop menu in menu bar'
- Menu Bar -> Develop -> Extension Builder
- Click on the '+' sign in the bottom left corner
- Choose 'Add Extension'
- Navigate into the unzipped folder and select the
  almaweb.safariextension folder
- Click on install
- (Optional) Hide the develop menu again

**Chrome**
- Open Chrome
- Menu Bar -> Window -> Extensions
- Activate 'Develop mode'
- Click on 'Load Unpacked'
- Navigate to the unzipped folder and select the
  chrome-extension folder

**Firefox**
- Open Firefox
- Enter about:debugging into the search bar
- Click on 'Load temporary add-on'
- Navigate into the firefox-extension folder inside the 
  unzipped folder
- Select the manifest.json file and click open
- Note that the extension is only installed temporarily (until you restart Firefox)

Go to [almaweb.uni-leipzig.de](https://almaweb.uni-leipzig.de) and enjoy.


#### Update

To update an extension delete the old version in the corresponding browser and download & install the new version.


#### Issues

If you find any problems please check out the issue board,
and create a new issue if none already exists.


#### Modify & Collaborate

Feel free to modify the extension to your liking.
If you want to do so you need to install
[nodejs & npm](https://nodejs.org).  

Inside the project folder you can run  
Build Extensions: ```npm run-script build```  
Create Release: ```npm run-script pack```  

Optionally you might want to install web-ext (a command line tool to create Firefox extensions). To do so run  
```npm install -g web-ext```  
You can then build the extension and run  
```cd build/firefox-extension```  
```web-ext run```

This will open up firefox and add the extension temporarily (until the next Firefox restart). 


The source folder holds a file called inject.js which get's
intjected into the almaweb page when it loads. When it does 
so it adds the css-rules defined in inject.css to the almaweb style.  
The source folder also holds subfolders for each extension. Within are their specific manifest files stored.  
The resource folder holds image files that might show up on 
several places inside each browser.

The name, version number, description & author don't have to
be set in the package.json file. The build tool will add those informations automatically to the manifest files.

Add your name to the contributors entry in package.json if you
changed something.
