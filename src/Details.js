import React, { Component } from 'react';
// import Axios from 'axios';
import Card from './Card';
import { CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';
class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            followers: this.props.followers,
            following: this.props.following,
        }
    }
    componentDidMount() {
        this.setState({
            followers: this.props.followers,
            following: this.props.following
        });
    }
    componentDidUpdate(prevProps) {
        if(prevProps.followers.length !== this.props.followers.length || prevProps.following.length !== this.props.following.length)
        this.setState({
            followers: this.props.followers,
            following: this.props.following
        });
    }
    render(props) {
        const { name, bio, avatar_url, company, location, login,blog, html_url,email,followers,following,public_repos} = this.props.user;
        // const {
        //     name, bio, avatar_url, company, location, login, id, node_id, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin,email,followers,following
        // } = this.props.user;
        return (
            <div className="card">
                <div className="row">
                    {/* <div className="col-sm-1"></div> */}
                    <div className="col-sm-4">
                        <a href={avatar_url} target="blank">
                            <img style={{ width: "100%", marginTop: "0%", padding: "5%" }} src={avatar_url} alt="logo-avatar"></img>
                        </a>
                    </div>
                    {/* <div className="col-sm-2"></div> */}
                    <div className="col-sm-8">
                        <p className="font-weight-bold lead display-4">
                            <i className="fas fa-user-ninja mx-2 p-4"></i>{name}
                            <i
                                className="fas fa-times float-right mt-2 mx-4 cross"
                                style={{ color: "red", fontSize: "0.5em" }}
                                onClick={this.props.toggleDetails}
                            ></i>
                        </p>
                        <p className="font-weight-bold font-italic lead ">
                            <i className="fab fa-github-alt mx-2"></i>{login}
                        </p>
                        <p className="font-italic lead ">
                            <i className="fas fa-envelope mx-2"></i>{email ? email : "No email Found"}
                        </p>
                        <p className="text-secondary">
                            <i className="fas fa-edit mx-2"></i>
                            {bio ?
                                (<span style={{ display: "inline", textAlign: "center", fontFamily:"cursive" }}>{bio}</span>)
                                : "No Bio Found"}
                        </p>
                        <p className="">
                            <i className="fas fa-university mx-2"></i>{company ? company : "No Company Found"}
                        </p>
                        <p className=" lead">
                            <i className="fas fa-map-marker-alt mx-2"></i>{location ? location : "No Locatoin Found"}
                        </p>
                        <p className=" lead">
                            <i className="fas fa-user-circle mx-2"></i>{blog ? (<a href={blog} target="blank">{blog}</a>) : "No Blog Found"}
                        </p>
                        <p className=" lead">
                            <i className="fab fa-github mx-2"></i>{html_url ? (<a href={html_url} target="blank">{html_url}</a>) : "No URL Found"}
                        </p>
                        <span className="badge badge-pill badge-primary float-right mx-4">Public Repos {public_repos}</span>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    {/* <div className="col-sm-4 row">
                        <div className="col-sm-6">
                            <ul>
                                <li>Github Handle :</li>
                                <li>id :</li>
                                <li>Node id :</li>
                                <li>HTML URL :</li>
                                <li>GISTS URL :</li>
                                <li>Starred URL :</li>
                                <li>Organizations URL :</li>
                                <li>Repos URL :</li>
                                <li>Events URL :</li>
                                <li>Recieved Events URL :</li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <ul>
                                <li>{login}</li>
                                <li>{id}</li>
                                <li>{node_id}</li>
                                <li>{html_url}</li>
                                <li>{gists_url}</li>
                                <li>{starred_url}</li>
                                <li>{organizations_url}</li>
                                <li>{repos_url}</li>
                                <li>{events_url}</li>
                                <li>{received_events_url}</li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="col-sm-1"></div>
                    <div style={{height:"50vh" }} className="col-sm-5 card">
                        <div className="card-header">
                            <i className="fas fa-users mx-2"></i><span className="text-primary">Followers</span>
                            <span className="badge badge-pill badge-primary float-right">{followers}</span>
                        </div>
                        <div className="card-body" style={{ overflowY: "scroll" }}>
                        <CSSTransition in={this.props.all.loadings} classNames="alert" appear unmountOnExit timeout={100}>
                            <div className="" style={{}}>
                                <Loader type="Oval" style={{position:"absolute",left:"40%",top:"30%"}} height={100} width={100} color="black"></Loader>
                            </div>
                            </CSSTransition>
                            <CSSTransition in={Boolean(this.props.all.message1)} classNames="alert" appear unmountOnExit timeout={500}>
                                <div className="text-light bg-danger text-center p-2 lead">
                                    <i className="fas fa-times float-left mx-4 cross" onClick={()=>this.props.messageHandler(1)}></i>
                                    {this.props.all.message1}
                                </div>
                            </CSSTransition>
                            { this.state.followers.map((user, i) => <Card key={i} user={user}></Card>)}
                        </div>
                    </div>
                    <div style={{ height:"50vh" }} className="col-sm-5 card">
                        <div className="card-header">
                            <i className="fas fa-users mx-2"></i><span className="text-success">Followers</span>
                            <span className="badge badge-pill badge-success float-right">{following}</span>
                        </div>
                        <div className="card-body" style={{ overflowY: "scroll" }}>
                            <CSSTransition in={this.props.all.loadingg} classNames="alert" appear unmountOnExit timeout={100}>
                                <div className="" style={{}}>
                                    <Loader type="BallTriangle" style={{position:"absolute",left:"40%",top:"30%"}} height={100} width={100} color="black"></Loader>
                                </div>
                            </CSSTransition>
                            <CSSTransition in={Boolean(this.props.all.message2)} classNames="alert" appear unmountOnExit timeout={500}>
                                <div className="text-light bg-danger text-center p-2 lead">
                                    <i className="fas fa-times float-left mx-4 cross" onClick={()=>this.props.messageHandler(2)}></i>
                                    {this.props.all.message2}
                                </div>
                            </CSSTransition>
                            {this.state.following.map((user, i) => <Card m={0} key={i} user={user}></Card>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;