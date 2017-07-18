# SAP Cloud Platform Training - User Interface Code

## Prerequisites
1. Have a SAP Cloud Platform Trial Account - [Click here](https://cloudplatform.sap.com/index.html)
2. Git installed - [Click here](https://git-scm.com/downloads)
3. Have the Web IDE Service Enabled - [Click here](https://account.hanatrial.ondemand.com/cockpit#/acc/service/webide/overview) 
4. Have the Backend part of this tutorial up and running - [Click here](https://github.com/frankrafael/scptraining-be)

## Steps - 1. HTML5 Application
1. Access [your SCP cockpit](https://account.hanatrial.ondemand.com/cockpit)
2. Navigate to Applications -> HTML5 Applications
3. Hit the New Application button and set the name as `scptrainingui` (without the hyphen sign)
4. Click on the newly created application on the list to open the Application Overview
5. Click the Versioning menu item and copy the Git Repository URL. We will used it on the next steps

## Steps - 2. Create a Destination
1. On your SCP Cockpit, access the Java Applications and open the `scptraining-be` App
2. On the Overview page, copy the App URL
3. Navigate back to your account (You can click on your account name on the directory control on the top of the page)
4. Access Connectivity -> Destinations
5. Hit the New Destination button and fill the form as follows:
- Name: scptraining
- URL: Paste the URL from you `scptraining-be` app and append `/api/` in the end
- Leave other fields with their default values
6. Hit Save then hit Check Connection, you should see a Success Message

## Steps - 3. Web IDE Bootstrap
1. On your SCP Cockpit, access the Services -> SAP Web IDE
2. On the SAP Web IDE Overview page, click on Go to Service
3. Once it loads, click on the New Project from option
4. Once the Wizard appears, select the SAPUI5 Application option and click Next
5. As project name use `scptraining-ui`, leave Namespace blank, then hit Next
6. On the Initial View Details form, select View Type as XML and define the View Name to: `Tasks`, then hit Finish
7. (Optional) To run the app, right click on the `scptraining-ui` project and select: Run -> Run As -> Web Application

## Steps - 4. Git Setup
1. Right click on the `scptraining-ui` project and select: Git -> Initialize Local Repository
2. Right click on the `scptraining-ui` project and select: Git -> Set Remote, then on the URL field provide the Git Repository URL that you copied from the HTML5 Application, step 5, then hit OK, and OK again
3. Click on the Git icon on the upper right corner, under the Search icon.
4. On the Git view, tick the Stage All checkbox, then write `Initial Commit` on the Commit Description box and hit the Commit Button
5. Click on the Merge Button and wait for it to work, select the Origin/Master branch and hit OK
6. Once merged, click on the `Push` dropdown button, select Remote Branch, select Origin/Master and hit OK

## Steps - 5. Copy files (Fake Development)
1. Copy the content of the files from this repository into the files on the Web IDE, create the files that are missing:
 - controller/* (all files)
 - i18n/i18n.properties
 - view/* (all files)
 - Component.js
 - index.html
 - manifest.json
 - neo-app.json
2. Click on the Git icon on the upper right corner, under the Search icon.
3. On the Git view, tick the Stage All checkbox, then write `Updating Files` on the Commit Description box and hit the Commit Button
4. Once commited, click on the `Push` dropdown button, select origin/master, and if errors occur due to ESLint, hit Push again

## Steps - 6. Deploying the application
1. Right click on the `scptraining-ui` project and select: Deploy -> Deploy to SAP Cloud Platform, hit Deploy, then cancel the Popup
2. Access your SCP Cockpit and navigate to Applications -> HTML5 Applications
3. Click on `scptrainingui` and click on the Application URL to launch the Application!