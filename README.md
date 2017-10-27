# TimeseriesGoReact

TO install on Windows Go lang 
 1. Download :  go1.8.3.windows-amd64.msi  
 install other packages required for project to run
	1. 	"encoding/json"
	2. 	"net/http"
	3. 	"github.com/gorilla/mux"
	4.	"io/ioutil"

2. Use the command line and go to the project folder and run
	go run TimeSeriesData.go
	
3. Browse the URLs to see the JSON Data:
	
	http://localhost:12345/cpusByDay
	http://localhost:12345/cpusByHour

	http://localhost:12345/memoriesByDay
	http://localhost:12345/memoriesByHour

	http://localhost:12345/disksByDay
	http://localhost:12345/disksByHour

4. Install CORS Browser Extension for the browser 
	 Moesif Origin & CORS Changer 0.2.4 ( e.g Chrome)

5. In command line- go to  Project directory at TimeseriesReact
	npm install
	npm run start
	
6. Install FusionCharts plugin as well if the graphs are not visible
	npm install fusioncharts

7. Browse the site :
	http://localhost:3000/
	
	Select TimeSeries ByDay and ByHour  - This will show the different results. 
	
8. If you see the results match with screen shots then Project is working.



To read the Json Data from http://localhost:12345/cpusByDay

 Run React Project (UI)
	
cd c/Dev/react/Project/async
$ npm run start


