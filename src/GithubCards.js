import React, { Component } from 'react';
import axios from 'axios'
import Card from './Card';
import './style.css'
import Details from './Details';
import { CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';
class GithubCards extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            message:"",
            message1:"",
            message2:"",
            user: "",
            index:0,
            data: [],
            followers: [],
            following: [],
            loading:true,
            loadingg:true,
            loadings: true,
            flag: false
        }
    }

    async componentDidMount() {
        await axios.get("https://api.github.com/users/RishabMangal", { headers: { 'Content-Type': 'application/json' } })
            .then((res, err) => {
            if (err) console.log(err);
            this.setState({ data: [res.data],loading:false,message:"" });
        }).catch((err) => {
            if(err.response)
                this.setState({ message: err.response.data.message, loading: false });
            else
            this.setState({ message: err.message, loading: false });
        });
    }
    onChangeHandler = (e) => {
        this.setState({ user: e.target.value });
    }
    
    onSubmitHandler = async(e) => {
        e.preventDefault();
        this.setState({ loading: true });
        if (!this.state.data.find(elem => { return elem.login.toUpperCase() === this.state.user.toUpperCase() })) {
            await axios.get(`https://api.github.com/users/${this.state.user}`, { headers: { 'Content-Type': 'application/json' } }).then((res, err) => {
                if (err) console.log("Error ", err);
                this.setState({ data: [...this.state.data, res.data],loading:false,message:"" });
            }).catch((err) => {
                if(err.response)
                    this.setState({ message: err.response.data.message, loading: false });
                else
                this.setState({ message: err.message, loading: false });
            });
        }
        else
            this.setState({ message: "User Already Added",loading:false });
    }

    toggleDetails = () => {
        this.setState({ flag: !this.state.flag });
    }


    clickHandler = async (i) => {
        this.toggleDetails();
        this.setState({ index: i,followers:[],following:[],message1:"",message2:"",loadingg:true,loadings:true});
        await axios.get(`https://api.github.com/users/${this.state.data[i].login}/followers`, { headers: { 'Content-Type': 'application/json' } })
            .then((res, err) => {
            if (err) console.log("There is an err while getting Followers");
            res.data.map(async (x, i) => {
                await axios.get(`https://api.github.com/users/${x.login}`, { headers: { 'Content-Type': 'application/json' } })
                    .then((res2, err) => {
                    if (err) console.log(err)
                    this.setState({ followers: [...this.state.followers, res2.data],message1:"",loadings:false })
                }).catch((err) => {
                    if(err.response)
                        this.setState({ message1: err.response.data.message, loadings: false });
                    else
                    this.setState({ message1: err.message, loadings: false });
                });
            });
           this.setState({ loadings: false });
        //    console.log("Followers data: ", res.data);
        }).catch((err) => {
            if(err.response)
                this.setState({ message1: err.response.data.message, loadings: false });
            else
            this.setState({ message1: err.message, loadings: false });
        });
        await axios.get(`https://api.github.com/users/${this.state.data[this.state.index].login}/following`, { headers: { 'Content-Type': 'application/json' } })
            .then((res, err) => {
            if (err) console.log("There is an err while getting Followers");
            res.data.map(async(x, i) => {
                await axios.get(`https://api.github.com/users/${x.login}`, { headers: { 'Content-Type': 'application/json' } })
                    .then((res2, err) => {
                    if (err) console.log(err)
                        this.setState({ following: [...this.state.following, res2.data], message2: "", loadingg: false });
                }).catch((err) => {
                    if(err.response)
                        this.setState({ message2: err.response.data.message, loadingg: false });
                    else
                    this.setState({ message2: err.message, loadingg: false });
                });
            })
           this.setState({ loadingg: false });
        //    console.log("Following data: ", res.data);
        }).catch((err) => {
            if(err.response)
                this.setState({ message2: err.response.data.message, loadingg: false });
            else
            this.setState({ message2: err.message, loadingg: false });
        });   
    }

    messageHandler = (i) => { 
        switch (i) {
            case 1:
                this.setState({ message1: "" });
                break;
            case 2:
                this.setState({ message2: "" });
                break;
            default:
                break;
        }
     }

    render() {
        return (
            <div style={{overflowX:"hidden"}}>
                <h1 className="text-light text-center m-4">Welcome to Github Cards</h1>
                <CSSTransition in={Boolean(this.state.message)} classNames="alert" appear unmountOnExit timeout={500}>
                    <div className="text-light bg-danger text-center m-4 p-2 lead">
                        <i className="fas fa-times float-left mx-4 cross" onClick={() => { this.setState({ message: "" }) }}></i>
                        {this.state.message}
                    </div>
                </CSSTransition>
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
                                required
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
                     <CSSTransition in={this.state.loading} classNames="alert" appear unmountOnExit timeout={100}>
                        <div className="gitcard col-sm-4" style={{}}>
                            <Loader type="MutatingDots" style={{backgroundColor:"#5d4e9930",position:"absolute",left:"40%",top:"30%"}} height={100} width={100} color="yellow"></Loader>
                        </div>
                    </CSSTransition>
                </div>
                <CSSTransition in={this.state.flag} classNames="alert" appear unmountOnExit timeout={500}>
                    <div className="row" style={{position:"fixed",top:"0px",width:"100%",backgroundColor:"#10101095",padding:"0.5%",paddingBottom:"2px",zIndex:"10"}}>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <Details messageHandler={this.messageHandler} all={this.state} toggleDetails={this.toggleDetails} user={this.state.data[this.state.index]} followers={this.state.followers} following={this.state.following}></Details>
                            </div>
                            <div className="col-sm-2"></div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default GithubCards;