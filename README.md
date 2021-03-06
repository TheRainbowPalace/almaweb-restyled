## Almaweb Restyled

Almaweb Restyled is an extension for Chrome, Firefox, Safari & Edge.
It restyles the look and feel of the [Almaweb
website](https://almaweb.uni-leipzig.de) of the University of Leipzig.
The goal is to provide a clean and easy to use design since the current
on (May 2018) is arguably not perfect.

#### Development Installation

Download the latest release inside the 'releases' folder and unzip the
file. It contains the extensions for each browser.  
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
- Open Google Chrome
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
- Note that the extension is only installed temporarily (until you
  restart Firefox)

**Edge**
- Open Microsoft Edge
- Enter about:flags into the search bar
- Activate 'Enable extension developer features'
- Click on the three dotted icon
- Click on Extensions
- Scroll to the bottom
- There should be a 'Load Extension' button here, if there is not
  restart Edge
- Click on the button
- Navigate to the unzipped folder and select the edge-extension folder
- Note that the extension will turn off after some idle time or when
  you restart the browser, you can reenable it in the extension menu

Go to [almaweb.uni-leipzig.de](https://almaweb.uni-leipzig.de) and enjoy.


#### Update

To update an extension delete the old version in the corresponding
browser and download & install the new version.


#### Issues

If you find any problems please check out the issue board,
and create a new issue if none already exists for the problem.


#### Modify & Collaborate

Feel free to modify the extension to your liking.
If you want to do so you need to install
[nodejs & npm](https://nodejs.org).  

Inside the project folder you can run  
Build Extensions: ```npm run-script build```  
Create Release: ```npm run-script pack```

The source folder holds a file called inject.js which get's
injected into almaweb website by the extension when the webpage loads.
The inject.js file then adds the css-rules defined in inject.css
to the almaweb website.  
The source folder also holds subfolders for each extension. Within are
their specific manifest files stored.  
The resource folder holds image files that might show up on 
several places inside each browser.

The name, version number, description & author don't have to
be set in each manifest file but only in the package.json file.
The build tool will then overwrite those informations automatically
inside the respective manifest files.

Please add your name to the contributors entry in package.json if you
distributed a change to this repo.

This package is licensed under MIT License so feel free to use it for
your purposes.
