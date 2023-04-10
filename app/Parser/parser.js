import {useState, useEffect} from "react";
import axios from "axios";
import * as cheerio from "cheerio";

const GETTABLE = 'GET-TABLE';
const GETSCORETABLE = 'GET-SCORETABLE';
const GETLEGUETITLE = 'GET-LEAGUE-TITLE';
const GETRESULTS = 'GET-RESULTS';
const LEAGYE_ID = '1056720';

const teamLink = [
    {
        link:'/club/38817758',
        extraLink:'10023956'
    },
    {
        link:'/club/11320664',
        extraLink: '10042082'
    },
    {
        link:'/club/619103238',
        extraLink:'10106276'
    },
    {
        link:'/club/39672600',
        extraLink:'10040476'
    },
    {
        link:'/club/320272744',
        extraLink: '10063610'
    },
    {
        link:'/club/203728359',
        extraLink:'10004051'
    },
    {
        link:'/club/61134798',
        extraLink: '10024204'
    },
    {
        link:'/club/36930470',
        extraLink:'10019180'
    },
    {
        link:'/club/52482886',
        extraLink: '10019179'
    },
    {
        link:'/club/96930172',
        extraLink: '10138581'
    }
]

const useFetch = (type, addition) => {
    const [data, setData] = useState([]);
    const [str, setStr]=useState('');
    const [tiData, setTiData] = useState([]);
    const [scData, setScData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [obj, setObj] = useState({});
    const fetchData = async (type, addition) => {
        switch (type) {
            case GETTABLE: {
                setIsLoading(true);
                let tableData = [];
                try {
                    const tableDataItem = {
                        team: "",
                        link: '',
                        logo: '',
                        position: 0,
                        played: 0,
                        win: 0,
                        draw: 0,
                        lose: 0,
                        goals: "",
                        goalsDiff: 0,
                        points: 0
                    }
                    const response = await axios.get(`http://www.goalstream.org/widget?new_template=1&mod=gchampionship&name=standings&subject=gchampionship_season_${LEAGYE_ID}`);
                    const $ = cheerio.load(response.data);
                    let arr = $('td')
                        .map(function (i, el) {
                            // this === el
                            return $(this).text();
                        })
                        .toArray()

                    let images = $('img')
                        .map(function (i, el) {
                            // this === el
                            return $(this);
                        })
                        .toArray()

                    let clubLink = $('.club_link')
                        .map(function (i, el) {
                            // this === el
                            return $(this);
                        })
                        .toArray()

                    for (let i = 0; i < images.length; i++) {
                        images[i][0].attribs.src = images[i][0].attribs.src.replace('12x12', '186x186');
                    }

                    for (let i = 0; i < 10; i++) {
                        let newItem = {...tableDataItem}
                        newItem.position = arr[10 * i];
                        newItem.logo = images[i][0].attribs.src;
                        newItem.team = arr[10 * i + 2];
                        newItem.link = clubLink[2*i][0].attribs.href;
                        newItem.played = arr[10 * i + 3];
                        newItem.win = arr[10 * i + 4];
                        newItem.draw = arr[10 * i + 5];
                        newItem.lose = arr[10 * i + 6];
                        newItem.goals = arr[10 * i + 7];
                        newItem.goalsDiff = arr[10 * i + 8];
                        newItem.points = arr[10 * i + 9];
                        tableData.push(newItem);
                    }

                    setData(tableData);
                    setIsLoading(false);
                    // console.log(tableData)
                } catch (error) {
                    setError(error);
                    console.log(error)
                } finally {
                    setIsLoading(false);
                }
                break;
            }
            case GETSCORETABLE: {
                setIsLoading(true);
                let scoreTableData = [];
                try {
                    const tableDataItem = {
                        position: 0,
                        name: "",
                        team: "",
                        logo: "",
                        played: 0,
                        goals: 0,
                        assist: 0,
                        ga: 0,
                    }

                    const response = await axios.get(`http://www.goalstream.org/widget?mod=gchampionship&name=goalscorers&subject=gchampionship_season_${LEAGYE_ID}`);
                    const $ = cheerio.load(response.data);
                    let arr = $('td')
                        .map(function (i, el) {
                            // this === el
                            return $(this).text().trim();
                        })
                        .toArray()

                    let images = $('img')
                        .map(function (i, el) {
                            // this === el
                            return $(this);
                        })
                        .toArray()

                    for (let i = 0; i < images.length; i++) {
                        images[i][0].attribs.src = images[i][0].attribs.src.replace('12x12', '186x186');
                    }
                    for (let i = 0; i < 30; i++) {
                        let newItem = {...tableDataItem}
                        newItem.position = arr[8 * i];
                        newItem.name = arr[8 * i + 1];
                        newItem.team = arr[8 * i + 3];
                        newItem.played = arr[8 * i + 4];
                        newItem.goals = arr[8 * i + 5].replaceAll(' ', '');
                        newItem.assist = arr[8 * i + 6];
                        newItem.ga = arr[8 * i + 7];
                        newItem.logo = images[i][0].attribs.src;
                        scoreTableData.push(newItem);
                    }
                    setData(scoreTableData);
                    setIsLoading(false);
                } catch (error) {
                    setError(error);
                    console.log(error)
                } finally {
                    setIsLoading(false);
                }
                break;
            }
            case GETLEGUETITLE: {
                let titleDataArr = [];
                try {
                    setIsLoading(true);
                    let titleData = {
                        title: '',
                        img: ''
                    };
                    // 1056720
                    const titleResponse = await axios.get(`http://www.goalstream.org/season/1056720/0643f0e7#/standings`);
                    const title = cheerio.load(titleResponse.data);
                    titleData.title = title('.b-gs-main-header__subj-title-full')[0].children[0].data;
                    titleData.img = title('.logo-avatar')[0].children[1].children[1].children[1].attribs.src;
                    titleDataArr.push(titleData);
                    // console.log(titleDataArr);
                    setTiData(titleDataArr);
                    setIsLoading(false);
                } catch (e) {
                    console.log(e);
                    setError(e)
                } finally {
                    setIsLoading(false)
                }
                break;
            }
            case GETRESULTS: {
                try {
                    const response = await axios.get("http://www.goalstream.org/widget?new_template=1&mod=gchampionship&name=schedule&subject=gchampionship_season_1056720&tz=300");
                    const $ = cheerio.load(response.data);

                    let matchTime = $('.match-time')
                        .map(function (i, el) {
                            return $(this).text().trim();
                        })
                        .toArray();
                    let stadium = $('.stadium')
                        .map(function (i, el) {
                            return $(this).text().trim();
                        })
                        .toArray();
                    let club = $('.club_link')
                        .map(function (i, el) {
                            return $(this).text().trim();
                        })
                        .toArray();
                    // console.log(club);
                    let arr = $('section')
//arr[1].children[1].children[0].data - тур
//arr[2].children[1].children[1].children[0].data - date
//arr[2].children[3].children[1].children[0].children[1].children[1].children[3].children[0].data - time
//                     console.log(arr);
                } catch (e) {

                }
                break;
            }
            case 'test': {
                try {
                    let teamDataItem={
                        location:'',
                        stadium:'',
                        fullName:'',
                        mostKnownPlayers:'',
                        legends:''
                    }

                    const response = await axios.get(`http://www.goalstream.org/widget?new_template=1&mod=gchampionship&name=standings&subject=gchampionship_season_${LEAGYE_ID}`);
                    const $ = cheerio.load(response.data);

                    let extraLink='';

                    for(let i of teamLink){
                        if(i.link==addition.url){
                            extraLink= i.extraLink;
                        }
                    }

                    const resp = await axios.get(`http://www.goalstream.org/widget?new_template=1&mod=gclub&name=profile-main&subject=gclub_club_${extraLink}`);
                    const pl = cheerio.load(resp.data);
                    let clubInfo = pl('.b-gs-widget__dummy')
                        .map(function (i, el) {
                            // this === el
                            return $(this).text().trim();
                        })
                        .toArray()
                    teamDataItem.location=clubInfo[1];
                    teamDataItem.stadium=clubInfo[3];
                    teamDataItem.fullName=clubInfo[4];
                    teamDataItem.mostKnownPlayers=clubInfo[9];
                    teamDataItem.legends=clubInfo[10];
                    setObj(teamDataItem);

                    // console.log(clubInfo);
                    let images = $('img')
                        .map(function (i, el) {
                            // this === el
                            return $(this);
                        })
                        .toArray()
                    const i=addition.position -1;
                    const img=images[i][0].attribs.src.replace('12x12', '186x186');
                    setStr(img);
                } catch (e) {
                    console.log(e);
                }
                break;
            }
            case 'GET-TEAMPLAYERS':{
                try{
                    let extraLink='';

                    for(let i of teamLink){
                        if(i.link==addition.url){
                            extraLink= i.extraLink;
                        }
                    }
                    // console.log(`http://www.goalstream.org/widget?format=json&mod=gclub&name=persons&new_template=true&season_id=${LEAGYE_ID}&status=approved&subject_id=${extraLink}&subject_type=gclub_club`)
                    const response= await axios.get(`http://www.goalstream.org/widget?format=json&mod=gclub&name=persons&new_template=true&season_id=${LEAGYE_ID}&status=approved&subject_id=${extraLink}&subject_type=gclub_club`)
                    setData(response.data.items);
                    // console.log(response);
                }catch (e) {
                    console.log(e);
                }
                break;
            }
            case 'GET-PLAYERS':{
                try{
                    const response = await axios.get(`http://www.goalstream.org/widget?format=json&mod=gchampionship&name=persons&new_template=true&subject_id=${LEAGYE_ID}&subject_type=gchampionship_season`);
                    // console.log(response);
                    setObj(response.data.items)
                }catch (e) {
                    console.log(e);
                }

            }
        }
    }
    useEffect(() => {
        fetchData(type, addition);
    }, []);

    const refetch = () => {
        setIsLoading(true);
        // fetchData();
    };

    return {data, str, obj, scData, tiData, isLoading, error, refetch};
}

export default useFetch;