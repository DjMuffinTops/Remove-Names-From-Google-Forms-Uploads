# Remove-Names-From-Google-Forms-Uploads
A script to remove the uploader names that Google Forms adds to the end of uploaded files.

### Create a new Google Spreadsheet and click on Extensions -> Apps Script
![image](https://user-images.githubusercontent.com/68816695/153732917-6cd6ba76-4d9c-49d2-8f57-2f3e43f61570.png)

### Paste the contents of `RemoveNamesFromGoogleFormsUploads.js` into the script. 
You will need to replace the `folderId` with the folder you'd like the script to run on. You can get the folder id in the url to your google drive folder, its the stuff after `/folders/` in the url. 
![image](https://user-images.githubusercontent.com/68816695/153732964-5a068d6f-6e34-41e9-9689-e55961bc103c.png)

### Return to the spreadsheet refresh the page, you will find a `Rename Files Menu` tab above. Clicking on it will show the runnable functions.
![image](https://user-images.githubusercontent.com/68816695/153733013-abdeefc2-d455-448e-9559-710ebaea17a8.png)

Click on any of the functions to run them. You will need to authorize the script on your first run, there will be a google popup for this.
- `Preview Rename Functions` will go through the contents of the given folder and record what it would rename the files too onto the spreadsheet.

- `Rename Functions` will do the same but actually rename the files.

- Both of these have a `Recursively` function which means it will also search through any sub folders of the given folder.

### These are the headers for what the functions will produce, you may want to add these yourself. All results will go below!
![image](https://user-images.githubusercontent.com/68816695/153733097-3ab95746-4418-4095-9188-b5c0b814f996.png)
