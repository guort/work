var Application = function($opt){	
  this.bind_=function(thisObj,fn) {
	  return function() {
		fn.apply(thisObj,arguments);
	  };
	};	
  this.playing_ = false;
  this.adsActive_ = false;
  this.adsDone_ = false;
  this.fullscreen = false;
  this.videoPlayer_ = new VideoPlayer($opt);
  this.ads_ = new Ads(this, this.videoPlayer_);
  this.videoEndedCallback_ = this.bind_(this, this.onContentEnded_);
  this.setVideoEndedCallbackEnabled(true);
  this.adTagUrl_=cu($opt.token);
  function cu($token){
	  switch($token){
		  case "354e6b14b65b79ad":
		  	str=1911360907
		  break;
		  case "12dec5848dfd":
		  	str=9295026905
		  break;
		  case "bd38ac4e6ff0":
		  	str=1771760101
		  break;		  		  
		  case "7711f940ba2a":
		  	str=3248493305
		  break;
		  case "334ca23eddb7633e":
		  	str=4725226508
		  break;
		  case "96219f691de0":
		  	str=6201959706
		  break;
		  case "0dcbe1bc988f":
		  	str=7678692905
		  break;
		  case "cc1a6e7f62ec":
		  	str=9155426101
		  break;
		  case "5442741495b9448a":
		  	str=1632159307
		  break;
		  case "194d21787b6e":
		  	str=3108892506
		  break;
		  case "2f4c7158b051":
		  	str=4585625709
		  break;
		  case "89c0305ed313":
		  	str=6062358907
		  break;
		  case "31f407e2ed56":
		  	str=4306424107
		  break;
		  case "6bbe35507492":
		  	str=7539092106
		  break;
		  case "681c0cfc4c19":
		  	str=4900023305
		  break;
		  case "7fe508c1dfdd":
		  	str=1492558509
		  break;
		  case "92ac5885d316d7c6fa230c16b3a439bb":
		  	str=2969291704
		  break;
		  case "6323b29e6435":
		  	str=4446024900
		  break;
		  case "0be2d360c83f776f":
		  	str=5922758106
		  break;
		  case "wxd4471e3cf530149a":
		  	str=7399491301
		  break;  
		  case "352b4b35b1f7":
		  	str=8876224503
		  break;
		  case "d0a7f729c918":
		  	str=1352957709
		  break;
		  case "8b7ef31db230":
		  	str=2829690906
		  break;
		  case "05102833242d":
		  	str=9015825306
		  break;
		  default:
		  str=1911360907
		  break	  
		  }
		  return "http://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&client=ca-video-pub-7913796772538237&description_url=http%3A%2F%2Fa.h5.mtq.tvm.cn%2Fyao%2Fcommon%2FgoogleAds%2Fvideo.html%3Ftoken%3D"+$token+"&channel="+str+"&videoad_start_delay=0&hl=zh_CN&max_ad_duration=15000"
	  }
}
Application.prototype.setVideoEndedCallbackEnabled=function(enable) {
  if (enable) {
    this.videoPlayer_.registerVideoEndedCallback(this.videoEndedCallback_);
  } else {
    this.videoPlayer_.removeVideoEndedCallback(this.videoEndedCallback_);
  }
 };
Application.prototype.log=function(message) {
  console.log(message)
};
Application.prototype.resumeAfterAd = function() {
  this.videoPlayer_.play();
  this.adsActive_ = false;
};
Application.prototype.pauseForAd = function() {
  this.adsActive_ = true;
  this.playing_ = true;
  this.videoPlayer_.pause();
};
Application.prototype.onClick_=function(){
  if (!this.adsDone_) {
    this.ads_.initialUserAction();
    this.videoPlayer_.preloadContent(this.bind_(this, this.loadAds_));
    this.adsDone_ = true;
    return;
  }
  if (this.adsActive_) {
    if (this.playing_) {
      this.ads_.pause();
    } else {
      this.ads_.resume();
    }
  } else {
    if (this.playing_) {
      this.videoPlayer_.pause();
    } else {
      this.videoPlayer_.play();
    }
  }
  this.playing_=!this.playing_;  
};
Application.prototype.loadAds_ = function() {
  this.videoPlayer_.removePreloadListener();
  this.ads_.requestAds(this.adTagUrl_);
};
Application.prototype.onContentEnded_ = function() {
  this.ads_.contentEnded();
};

var Ads = function(application, videoPlayer) {
  this.application_ = application;
  this.videoPlayer_ = videoPlayer;
  this.customClickDiv_ =null 
  this.contentCompleteCalled_ = false;
  google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
  // Call setLocale() to localize language text and downloaded swfs
  // google.ima.settings.setLocale('fr');
  this.adDisplayContainer_ =
      new google.ima.AdDisplayContainer(
          this.videoPlayer_.adContainer,
          this.videoPlayer_.contentPlayer,
          this.customClickDiv_);
  this.adsLoader_ = new google.ima.AdsLoader(this.adDisplayContainer_);
  this.adsManager_ = null;

  this.adsLoader_.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.onAdsManagerLoaded_,
      false,
      this);
  this.adsLoader_.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError_,
      false,
      this);
};
// On iOS and Android devices, video playback must begin in a user action.
// AdDisplayContainer provides a initialize() API to be called at appropriate
// time.
// This should be called when the user clicks or taps.
Ads.prototype.initialUserAction = function() {
  this.adDisplayContainer_.initialize();
  this.videoPlayer_.contentPlayer.load();
};

Ads.prototype.requestAds = function(adTagUrl) {
  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl = adTagUrl;
  adsRequest.linearAdSlotWidth = this.videoPlayer_.width;
  adsRequest.linearAdSlotHeight = this.videoPlayer_.height;
  adsRequest.nonLinearAdSlotWidth = this.videoPlayer_.width;
  adsRequest.nonLinearAdSlotHeight = this.videoPlayer_.height;
  this.adsLoader_.requestAds(adsRequest);
};
Ads.prototype.pause = function() {
  if (this.adsManager_) {
    this.adsManager_.pause();
  }
};
Ads.prototype.resume = function() {
  if (this.adsManager_) {
    this.adsManager_.resume();
  }
};
Ads.prototype.resize=function(width, height) {
  if (this.adsManager_) {
    this.adsManager_.resize(width, height, google.ima.ViewMode.FULLSCREEN);
  }
};
Ads.prototype.contentEnded = function() {
  this.contentCompleteCalled_ = true;
  this.adsLoader_.contentComplete();
};
Ads.prototype.onAdsManagerLoaded_ = function(adsManagerLoadedEvent) {
  this.application_.log('Ads loaded.');
  var adsRenderingSettings = new google.ima.AdsRenderingSettings();
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  this.adsManager_=adsManagerLoadedEvent.getAdsManager(this.videoPlayer_.contentPlayer,adsRenderingSettings);
  this.processAdsManager_(this.adsManager_);
};
Ads.prototype.processAdsManager_ = function(adsManager) {
  if (adsManager.isCustomClickTrackingUsed()) {
    this.customClickDiv_.style.display = 'table';
  }
  // Attach the pause/resume events.
  adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,this.onContentPauseRequested_,false,this);
	  adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,this.onContentResumeRequested_,false,this);
  // Handle errors.
  adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError_,
      false,
      this);
  var events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
                google.ima.AdEvent.Type.CLICK,
                google.ima.AdEvent.Type.COMPLETE,
                google.ima.AdEvent.Type.FIRST_QUARTILE,
                google.ima.AdEvent.Type.LOADED,
                google.ima.AdEvent.Type.MIDPOINT,
                google.ima.AdEvent.Type.PAUSED,
                google.ima.AdEvent.Type.STARTED,
                google.ima.AdEvent.Type.THIRD_QUARTILE];
  for (var index in events) {
    adsManager.addEventListener(
        events[index],
        this.onAdEvent_,
        false,
        this);
  }
  var initWidth, initHeight;
  if (this.application_.fullscreen) {
    initWidth = this.application_.fullscreenWidth;
    initHeight = this.application_.fullscreenHeight;
  } else {
    initWidth = this.videoPlayer_.width;
    initHeight = this.videoPlayer_.height;
  }
  adsManager.init(initWidth,initHeight,google.ima.ViewMode.NORMAL);
  adsManager.start();
};
Ads.prototype.onContentPauseRequested_ = function() {
  this.application_.pauseForAd();
  this.application_.setVideoEndedCallbackEnabled(false);
};
Ads.prototype.onContentResumeRequested_ = function() {
  this.application_.setVideoEndedCallbackEnabled(true);
  if (!this.contentCompleteCalled_) {
    this.application_.resumeAfterAd();
  }
};
Ads.prototype.onAdEvent_ = function(adEvent) {
  this.application_.log('Ad event: ' + adEvent.type);
  if (adEvent.type == google.ima.AdEvent.Type.CLICK) {   
  } else if (adEvent.type == google.ima.AdEvent.Type.LOADED) {
    var ad = adEvent.getAd();
    if (!ad.isLinear()) {
      this.onContentResumeRequested_();
    }
  }
};
Ads.prototype.onAdError_ = function(adErrorEvent) {
  this.application_.log('Ad error: ' + adErrorEvent.getError().toString());
  if (this.adsManager_) {
    this.adsManager_.destroy();
  }
  this.application_.resumeAfterAd();
};
var VideoPlayer = function($opt) {
  this.contentPlayer =$opt.ele 
  this.adContainer = $opt.adcontainer;
  this.width =$opt.width;
  this.height =$opt.height;
};
VideoPlayer.prototype.preloadContent = function(contentLoadedAction) {
  // If this is the initial user action on iOS or Android device,
  // simulate playback to enable the video element for later program-triggered
  // playback.
  if (this.isMobilePlatform()) {
    this.preloadListener_ = contentLoadedAction;
    this.contentPlayer.addEventListener('loadedmetadata',contentLoadedAction,false);
    this.contentPlayer.load();
  } else {
    contentLoadedAction();
  }
};

VideoPlayer.prototype.removePreloadListener = function() {
  if (this.preloadListener_) {
    this.contentPlayer.removeEventListener('loadedmetadata',this.preloadListener_,false);
    this.preloadListener_ = null;
  }
};

VideoPlayer.prototype.play = function() {
  this.contentPlayer.play();
};
VideoPlayer.prototype.pause = function() {
  this.contentPlayer.pause();
};
VideoPlayer.prototype.isMobilePlatform = function() {
  return this.contentPlayer.paused &&
      (navigator.userAgent.match(/(iPod|iPhone|iPad)/) ||
       navigator.userAgent.toLowerCase().indexOf('android') > -1);
};
VideoPlayer.prototype.resize = function(position, top, left, width, height) {
  this.videoPlayerContainer_.style.position = position;
  this.videoPlayerContainer_.style.top = top + 'px';
  this.videoPlayerContainer_.style.left = left + 'px';
  this.videoPlayerContainer_.style.width = width + 'px';
  this.videoPlayerContainer_.style.height = height + 'px';
  this.contentPlayer.style.width = width + 'px';
  this.contentPlayer.style.height = height + 'px';
};
VideoPlayer.prototype.registerVideoEndedCallback = function(callback) {
  this.contentPlayer.addEventListener('ended', callback, false);
};
VideoPlayer.prototype.removeVideoEndedCallback = function(callback) {
  this.contentPlayer.removeEventListener('ended', callback, false);
};
