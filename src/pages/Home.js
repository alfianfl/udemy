import React, { Component } from 'react';
import '../assets/css/home.css'
import WhatYouLearn from '../component/WhatYouLearn';
import youtubeApi from '../API/youtubeApi';
import Deskripsi from '../component/Deskripsi'
import NavKelas from '../component/NavKelas'
import ListVideo from '../component/ListVedeo'
import DeskripsiPemateri from '../component/DeskripsiPemateri'
import Komentar from '../component/Komentar';
import FormUlasan from '../component/FormUlasan';
import Rekomendasi from '../component/Rekomendasi'
import ThumbnailHome from '../component/ThumbnailHome'
import Footer from '../component/Footer'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbVideo : [],
      dropdownActive:null,
      selectedVideoId: null,
      videoChannel:'',
      videoTitle:'',
      recomList:[{},{},{},{}],
      videoImage:null,
      isTruncated:true,
      komentar:[{},{},{},{}],
      showmore:'Tampilkan lebih banyak'
    };
  }
  dropdownActive = (index) =>{
    this.setState({
      dropdownActive:this.state.thumbVideo[index],
      active:true
    })
  }
  dropdownActiveStyle = (index) =>{
    if(this.state.dropdownActive === this.state.thumbVideo[index] ){
      return 'detail-video '

    }else{
      return 'detail-video display-none'
    }
  }
  componentDidMount(){
    youtubeApi.get('/search',{
      params: {
        q: 'Tutorial ReactJS'
      }
    })
    .then(response => {
      this.setState({
        thumbVideo: response.data.items,
        videoImage:response.data.items[0].snippet.thumbnails.default.url
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // toggle
  toggleTruncated = () =>{
    this.setState({
      isTruncated:!this.state.isTruncated
    })
    if(this.state.showmore=='Tampilkan lebih banyak'){
        this.setState({showmore:'Tampilkan lebih sedikit'})
    }else{
      this.setState({showmore:'Tampilkan lebih banyak'})
    }
}
  render() {
    const resultTruncated = this.state.isTruncated ? this.state.thumbVideo.slice(0,9) : this.state.thumbVideo;
    return (
      <div>
        <NavKelas/>
        <div className="row">
          <div className=" col-lg-12">
            <ThumbnailHome />
          </div>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-lg-8">
              < WhatYouLearn />
                <div className="konten-kursus mt-4">
                  <h4 > <strong> Konten kursus</strong></h4>
                  <div className="detail-pengerjaan d-flex justify-content-between mt-4 mb-2">
                    <span>13 bagian • 149 pelajaran • 18j 3m total durasi</span>
                    <strong><a href="#" style={{color:"#0f7c90"}}>Perluas semua bagian</a></strong>
                  </div>
                  <div className="list-video ">
                    <ListVideo
                      thumbVideo={resultTruncated}
                      dropdownActiveStyle={(index) => this.dropdownActiveStyle(index)}
                      dropdownActive={(index) => this.dropdownActive(index)}
                    />
                  <div>
                    <button className="btn btn-login w-100 mt-3" onClick={this.toggleTruncated}> <strong>{this.state.showmore}</strong> </button>
                  </div>   
                  </div>
                </div>
              </div>
            </div> 
            <div className="row mt-4">
              <div className="col-lg-7">
                <h4><strong>Persyaratan</strong></h4>
                <ul className="dot-list mt-3">
                    <li>Dasar - dasar HTML dan CSS</li>
                    <li>Dasar - dasar pemprograman seperti varibale, if statement, looping, dan function</li>
                    <li>Terbiasa menggunakan code editor seperti Visual Studio, Sublime, Atom , atau editor lainnya</li>
                </ul>
                <div className="deskripsi mt-4">
                  <Deskripsi/>     
                </div>     
              </div>
            </div>
            <div className="row mt-4 rekomendasi-container">
              <div className="col-lg-8 ">
                  <Rekomendasi
                    recomList={this.state.recomList}
                    image={this.state.videoImage}
                  />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-8">
                <DeskripsiPemateri/>
              </div>
            </div> 
            <div className="row mt-3">
              <div className="col-lg-8">
                <FormUlasan/>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-8">
                <Komentar
                  komentar={this.state.komentar}
                />
              </div>
            </div>       
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Home;
