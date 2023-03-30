import {useState, useEffect} from "react";
import axios from "axios";
import * as cheerio from "cheerio";

const GETTABLE = 'GET-TABLE';
const GETSCORETABLE = 'GET-SCORETABLE';
const GETLEGUETITLE='GET-LEAGUE-TITLE';
const LEAGYE_ID='1056720';
const useFetch = (type) => {
    const [data, setData] = useState([]);
    const [tiData, setTiData] = useState([]);
    const [scData, setScData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = async (type) => {
        switch (type) {
            case GETTABLE: {
                setIsLoading(true);
                let tableData = [];
                try {
                    const tableDataItem = {
                        team: "",
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

                    for (let i = 0; i < images.length; i++) {
                        images[i][0].attribs.src = images[i][0].attribs.src.replace('12x12', '186x186');
                    }

                    for (let i = 0; i < 10; i++) {
                        let newItem = {...tableDataItem}
                        newItem.position = arr[10 * i];
                        newItem.logo = images[i][0].attribs.src;
                        newItem.team = arr[10 * i + 2];
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
                    setScData(scoreTableData)

                    setIsLoading(false);
                } catch (error) {
                    setError(error);
                    console.log(error)
                } finally {
                    setIsLoading(false);
                }
                break;
            }
            case GETLEGUETITLE:{
                let titleDataArr=[];
                try{
                    setIsLoading(true);
                    let titleData={
                        title:'',
                        img:''
                    };
                    // 1056720
                    const titleResponse= await axios.get(`http://www.goalstream.org/season/1056720/0643f0e7#/standings`);
                    const title=cheerio.load(titleResponse.data);
                    titleData.title=title('.b-gs-main-header__subj-title-full')[0].children[0].data;
                    titleData.img=title('.logo-avatar')[0].children[1].children[1].children[1].attribs.src;
                    titleDataArr.push(titleData);
                    // console.log(titleDataArr);
                    setTiData(titleDataArr);
                    setIsLoading(false);
                }catch (e) {
                    console.log(e);
                    setError(e)
                }finally {
                    setIsLoading(false)
                }
                break;
            }
        }
    }
    useEffect(() => {
        fetchData(type);
    }, []);

    const refetch = () => {
        setIsLoading(true);
        // fetchData();
    };

    return {data, scData, tiData, isLoading, error, refetch};
}

export default useFetch;