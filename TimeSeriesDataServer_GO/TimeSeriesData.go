package main

import(
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
    "io/ioutil"
    "fmt"
    "os"
)

type Memory struct{
	Label 	string 	`json:"label,omitempty"`
	Value 	string   `json:"value,omitempty"`	
}

type Disk struct{
	Label 	string 	`json:"label,omitempty"`
	Value 	string   `json:"value,omitempty"`
}

type CPU struct{
	Label 	string 	`json:"label,omitempty"`
	Value 	string   `json:"value,omitempty"`
}

// type Data struct{
// 	Label 	string 	`json:"label,omitempty""`
// 	Value 	string 	`json:"value,omitempty"`
// }

//  type Chart struct {
// 	caption 	string `json:"caption,omitempty""`
// 	subCaption 	string `json:"subCaption,omitempty""`
// 	xAxisName 	string `json:"xAxisName,omitempty""`
// 	yAxisName	string `json:"yAxixName,omitempty""`
// 	theme		string `json:"theme,omitempty""`
// 	animation	string `json:"animation,omitempty""`
// }

var cpus []CPU
var cpusByDay []CPU
var disks  []Disk
var disksByDay  []Disk
var memories []Memory
var memoriesByDay []Memory
/** CPU Endpoints **/
func GetCpuEndpoint(w http.ResponseWriter, req *http.Request){    
	params := mux.Vars(req)
	fmt.Println(params)
	for _, item := range cpus {		
		if item.Value == params["value"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&CPU{})			
}

func GetCpusEndpoint(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(cpus)
}

func GetCpusByDayEndpoint(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(cpusByDay)
}

/** Disk Endpoints **/
func GetDiskEndpoint(w http.ResponseWriter, req *http.Request){    
	params := mux.Vars(req)
	
	for _, item := range disks {
		if item.Value == params["value"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Disk{})			
}

func GetDisksEndpoint(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(disks)
}
func GetDisksByDayEndpoint(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(disksByDay)
}

/** Memory Endpoints **/
func GetMemoryEndpoint(w http.ResponseWriter, req *http.Request){ 
	
	params := mux.Vars(req)
	for _, item := range memories {		
		if item.Value == params["value"] {			
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Memory{})			
}

func GetMemoriesEndpoint(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(memories)
}

func GetMemoriesByDayEndpoint(w http.ResponseWriter, req *http.Request){
	json.NewEncoder(w).Encode(memoriesByDay)
}
/** Read Json Data from File **/
func getJsonData(fileName string) []byte {    
    raw, err := ioutil.ReadFile(fileName)
    if err != nil {
        fmt.Println(err.Error())
        os.Exit(1)
    }
    return raw
}

func main() {

    router := mux.NewRouter()

    // Unmarshal Json data
    
    json.Unmarshal(getJsonData("./disksByHour.json"), &disks)
	json.Unmarshal(getJsonData("./disksByDay.json"), &disksByDay)
    json.Unmarshal(getJsonData("./memoriesByHour.json"), &memories)
	json.Unmarshal(getJsonData("./memoriesByDay.json"), &memoriesByDay)
	json.Unmarshal(getJsonData("./cpusByHour.json"), &cpus)
	json.Unmarshal(getJsonData("./cpusByDay.json"), &cpusByDay)	
	
    // Disk
    router.HandleFunc("/disksByDay", GetDisksByDayEndpoint).Methods("GET")  
    router.HandleFunc("/disksByHour", GetDisksEndpoint).Methods("GET")    
    router.HandleFunc("/disks/{value}", GetDiskEndpoint).Methods("GET")

    // CPU	
	router.HandleFunc("/cpusByDay", GetCpusByDayEndpoint).Methods("GET")	
    router.HandleFunc("/cpusByHour", GetCpusEndpoint).Methods("GET")
    router.HandleFunc("/cpus/{value}", GetCpuEndpoint).Methods("GET") 

    // Memory
    router.HandleFunc("/memoriesByDay", GetMemoriesByDayEndpoint).Methods("GET")
	router.HandleFunc("/memoriesByHour", GetMemoriesEndpoint).Methods("GET")
    router.HandleFunc("/memories/{value}", GetMemoryEndpoint).Methods("GET")

    log.Fatal(http.ListenAndServe(":12345", router))
}

