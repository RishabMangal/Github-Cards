import React, { Component } from 'react';
import axios from 'axios'
import Card from './Card';
import './style.css'
import Details from './Details';
import { CSSTransition } from 'react-transition-group';
class GithubCards extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: "",
            index:0,
            data: [
                {
                "login": "RishabMangal",
                "id": 46511803,
                "node_id": "MDQ6VXNlcjQ2NTExODAz",
                "avatar_url": "https://avatars2.githubusercontent.com/u/46511803?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/RishabMangal",
                "html_url": "https://github.com/RishabMangal",
                "followers_url": "https://api.github.com/users/RishabMangal/followers",
                "following_url": "https://api.github.com/users/RishabMangal/following{/other_user}",
                "gists_url": "https://api.github.com/users/RishabMangal/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/RishabMangal/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/RishabMangal/subscriptions",
                "organizations_url": "https://api.github.com/users/RishabMangal/orgs",
                "repos_url": "https://api.github.com/users/RishabMangal/repos",
                "events_url": "https://api.github.com/users/RishabMangal/events{/privacy}",
                "received_events_url": "https://api.github.com/users/RishabMangal/received_events",
                "type": "User",
                "site_admin": false,
                "name": "Rishab Mangal",
                "company": "IIIT Kota",
                "blog": "https://rishabmangal.netlify.com",
                "location": "Jaipur,Rajasthan,India",
                "email": null,
                "hireable": null,
                "bio": "Currently,Pursuing B.tech from IIIT Kota in CSE branch.I am in Second Year.",
                "public_repos": 16,
                "public_gists": 0,
                "followers": 0,
                "following": 0,
                "created_at": "2019-01-09T03:38:51Z",
                "updated_at": "2020-05-09T19:10:28Z"
                }
            ],
            followers: [],
            following: [],
            loadingg:true,
            loadings: true,
            flag: false
        }
    }

    onChangeHandler = (e) => {
        this.setState({ user: e.target.value });
    }
    
    onSubmitHandler = async(e) => {
        e.preventDefault();
        if (!this.state.data.find(elem => {return elem.login === this.state.user}))
        {
            await axios.get(`https://api.github.com/users/${this.state.user}`, { headers: { 'Content-Type': 'application/json' } }).then((res, err) => {
                if (err) console.log("Error ", err);
                if (!res.data.message) this.setState({ data: [...this.state.data, res.data] });
                else alert("No such user");
            });
        }
        else
            alert("User Already Added");
    }

    toggleDetails = () => {
        this.setState({ flag: !this.state.flag });
    }


    clickHandler = async (i) => {
        this.toggleDetails();
        this.setState({ index: i,followers:[],following:[]});
        await axios.get(`https://api.github.com/users/${this.state.data[i].login}/followers`, { headers: { 'Content-Type': 'application/json' } })
            .then((res, err) => {
            if (err) console.log("There is an err while getting Followers");
            res.data.map(async (x, i) => {
                await axios.get(`https://api.github.com/users/${x.login}`, { headers: { 'Content-Type': 'application/json' } }).then((res2, err) => {
                    if (err) console.log(err)
                    this.setState({ followers: [...this.state.followers, res2.data] })
                });
            });
           this.setState({ loadings: false });
        //    console.log("Followers data: ", res.data);
        });
        await axios.get(`https://api.github.com/users/${this.state.data[this.state.index].login}/following`,{headers: {'Content-Type':'application/json'}}).then((res, err) => {
            if (err) console.log("There is an err while getting Followers");
            res.data.map(async(x, i) => {
                await axios.get(`https://api.github.com/users/${x.login}`, { headers: { 'Content-Type': 'application/json' } }).then((res2, err) => {
                    if (err) console.log(err)
                    this.setState({ following: [...this.state.following, res2.data] })
                });
            })
           this.setState({ loadingg: false });
        //    console.log("Following data: ", res.data);
        });
        
    }

    render() {
        return (
            <div style={{overflowX:"hidden"}}>
                <h1 className="text-light text-center m-4">Welcome to Github Cards</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group row">
                        <div className="col-sm-2"></div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Github Handle"
                                className="form-control-lg col-sm-6"
                                onChange={this.onChangeHandler}
                                value={this.state.user}
                            >
                            </input>
                            <button
                                type="submit"
                                className="btn btn-primary col-sm-1 mx-4"
                                style={{ fontSize: "1.5em", textAlign: "center" }}
                            >
                            <i className="fab fa-searchengin mx-2"></i>Find
                            </button>
                    </div>
                </form>
                    
                <div className="row" >
                    {this.state.data.map((user, i) => (
                        <div className="gitcard col-sm-4" key={i} style={{}} onClick={()=>this.clickHandler(i)}>
                            <Card m={0}  user={user}></Card>
                        </div>
                    ))}
                </div>
                <CSSTransition in={this.state.flag} classNames="alert" appear unmountOnExit timeout={500}>
                    <div className="row" style={{position:"fixed",top:"0px",width:"100%",backgroundColor:"#10101095",padding:"0.5%",paddingBottom:"2px"}}>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <Details toggleDetails={this.toggleDetails} user={this.state.data[this.state.index]} followers={this.state.followers} following={this.state.following}></Details>
                            </div>
                            <div className="col-sm-2"></div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default GithubCards;