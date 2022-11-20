// file content von mithilfe von fetch importieren (muss auf dem Server gemacht werden)
const data = JSON.parse('[ { "date":"6-12-2022" }, { "date":"8-12-2022" }, { "date":"23-12-2022" }, { "date":"24-12-2022" }, { "date":"25-12-2022" }, { "date":"26-12-2022" }, { "date":"27-12-2022" }, { "date":"22-1-2023" },{ "date":"19-2-2023" } ]');

const date = new Date();

let monthoffset = 0;
let yearoffset = 0;

let dayinmonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let namemonth = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

let day = date.getDate();
let months = date.getMonth();
let year = date.getFullYear();

function changelabel(){
    setmonthyearlabel();

    var listofdays = [];
    var isempty = [];

    // First day of the month
    let daysofmonth = new Date((year+yearoffset).toString() + "-" + (monthoffset + months + 1).toString() + "-01");
    // Reset to the first day that will show in the carlender
    daysofmonth.setDate(daysofmonth.getDate() - daysofmonth.getDay());

    // Create List of dates that are in the Month
    for (let i = 0; i < 35; i++){
        // Check if the day is booked out
        for(let i = 0; i < data.length; i++){
            if( ( daysofmonth.getDate()+"-"+(daysofmonth.getMonth()+1)+"-"+daysofmonth.getFullYear() ) == data[i].date){
                isempty.push(1);
            }
        } 
        listofdays.push(new Date(daysofmonth.getTime()));                  // get date für das ganze datum entfernen
        if(listofdays.length != isempty.length){
            isempty.push(0);
        }
        daysofmonth.setDate(daysofmonth.getDate() +1);
    }

    // Create List of Labels
    for (let i = 0; i < 35; i++){
        if(listofdays[i].getDate() < 10){
            document.getElementById("d"+(i+1).toString()).innerHTML = "0"+listofdays[i].getDate();
        }
        else{
            document.getElementById("d"+(i+1).toString()).innerHTML = listofdays[i].getDate();
        }

        if(isempty[i] == 1){
            document.getElementById("d"+(i+1).toString()).style.border = '1px solid red';
        }
        else{
            document.getElementById("d"+(i+1).toString()).style.border = '1px solid aliceblue';            
        }

        //
        //document.getElementById("d"+(i+1).toString()).style.border = '1px solid aliceblue';       
    }
}

function setmonthyearlabel(){
    let monthlabel = months + monthoffset;;
    
    if(months + monthoffset < 0){
        changemonthoffset(12);
        changeyearoffset(-1);
        monthlabel = months + monthoffset;
    }
    if(months + monthoffset > 11){
        changemonthoffset(-12)
        changeyearoffset(1);
        monthlabel = months + monthoffset;
    }

    document.getElementById("date").innerHTML = namemonth[monthlabel] + "-" +(yearoffset + year);
}

function changeyearoffset(offset){
    yearoffset = yearoffset + offset;
}

function changemonthoffset(offset){
    monthoffset = monthoffset + offset;
}

function monthchange(x){
    changemonthoffset(x);
    changelabel();
}

