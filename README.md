# microservice-sip

The purpose of this microservice is to collect all the content that should be stored in the Long Time Digital Preservation (LTDP)system, and store it in a SIP together with technical metadata about the content (such as number of floors if there is an IFC file), enrichment metadata provided by the user (such a building style being Gothic), and also metadata about the package from a archival system perspective (such a checksum for each of the files contained).

The way this works is that content (enrichment files from the user, technical metadata, and the arhcitectual content in the form of IFC and/or e57 files) is stored in a folder unique for the session that the user is currently working on. On this folder a file identificator (Droid) is run when the user inititiates it from the gui. It produces file identification if the file matches a known profile (e57 is known and IFC has been added to the official Droid-profile set by the Duraark project). This Droid identification data is also added to the set of content to be stored. After the files (the basic content and diffent types of metadata) is stored in a temporary directory this is then stored in a SIP-package which can then be inserted into a LTDP-system.

The session handling is also done by the SIP microservice.

## Demo-Server

A showcasing demo incorporating the service running on our [development system](http://juliet.cgv.tugraz.at). It is a development system, not a production one. You will always have the newest version running there, but it is also possible to experience bugs. A production demo will be available soon at http://workbench.duraark.eu. Currently we have the first prototype version running there.

## Setup & Installation

The deployment setup is based on the repository [microservice-base](https://github.com/DURAARK/microservice-base). It provides development scripts and docker deployment. Have a look at the link to get more detailed information.
## API Documentation

The following API endpoints are available:

### POST http://localhost:5005/enrichment/extract

### Description

Starts enrichment search based on a location property (or 'information seed').

#### Payload

```json  
{
  "locationProperties": "$PROPERTY"
}
```
where $PROPERTY is one of
* IFCPOSTALADDRESS
* IFCBUILDING
* IFCORGANIZATION

#### Response

```json
[{
	"datasetId": "datasetId",
	"name": "name",
	"resourceId": "esourceId",
	"resourceUri": "resourceUri",
	"propertyUri": "propertyUri",
	"resourceValue": "resourceValue"
}]
```

Enjoy!

