import React from 'react';
import Navbar from './navbar';
import SubpageWatermark from './SubpageWatermark';

function YouAFit() {
  return (
    <div className="App">
      {/* Background watermark */}
      <SubpageWatermark size="60vmin" position="center center" zIndex={0} />

      <Navbar />

      <div className="hit-it-page">
        <div className="hit-it-page-container">
          <h1 style={{ marginTop: '60px' }}>You a Fit?</h1>
          <p>
            NRI Stories<span className="reg-mark">®</span> – <span style={{ color: '#D2691E', fontWeight: '700' }}>A compelling podcast</span> – with a difference
          </p>
          
          <p>
            It will not be opinionated or judgemental.<br/>
            We will tell stories that are true to life.<br/>
            We will tell stories that are un-hyphenated.<br/>
            We will tell stories that are straight from the heart.
          </p>

          <p style={{ fontWeight: '400', fontFamily: 'Times New Roman, serif' }}>
            <span className="stories-of">Stories of</span> success.<br/>
            <span className="stories-of">Stories of</span> sacrifices.<br/>
            <span className="stories-of">Stories of</span> raw emotions.<br/>
            <span className="stories-of">Stories of</span> overriding ambition.<br/>
            <span className="stories-of">Stories of</span> guts, valour and hard work.
          </p>

          <p style={{ fontWeight: '400', fontFamily: 'Times New Roman, serif' }}>
            <span className="stories-of">Stories of</span> facing hurdles.<br/>
            <span className="stories-of">Stories of</span> motivational value.<br/>
            <span className="stories-of">Stories of</span> steely determination.<br/>
            <span className="stories-of">Stories of</span> a never-say-die approach.<br/>
            <span className="stories-of">Stories of</span> attaining freedom & security.<br/>
            <span className="stories-of">Stories of</span> exemplary grit & perseverance.<br/>
            <span className="stories-of">Stories of</span> insulating family from insecurities.<br/>
            <span className="stories-of">Stories of</span> protracted separation from loved ones.<br/>
            <span className="stories-of">Stories of</span> consistent, persistent and steadfast focus.
          </p>

          <p style={{ fontWeight: '400', fontFamily: 'Times New Roman, serif' }}>
           
            <span className="stories-of">Stories of</span> students.<br/>
            <span className="stories-of">Stories of</span> asylum seekers.<br/>
            <span className="stories-of">Stories of</span> undocumented aliens.<br/>
            <span className="stories-of">Stories of</span> being emulation worthy.<br/>
            <span className="stories-of">Stories of</span> families – wives, kids, parents.
          </p>

          <p style={{ fontWeight: '400', fontFamily: 'Times New Roman, serif' }}>
            <span className="stories-of">Stories of</span> the rich and powerful.<br/>
            <span className="stories-of">Stories of</span> startups.<br/>
            <span className="stories-of">Stories of</span> market leaders.<br/>
            <span className="stories-of">Stories of</span> business acumen.<br/>
            <span className="stories-of">Stories of</span> creating employment.<br/>
            <span className="stories-of">Stories of</span> helming organisations.<br/>
            <span className="stories-of">Stories of</span> trend setters and influencers.
          </p>

          <p style={{ color: '#D2691E', fontWeight: '700' }}>
            NRI Stories<span className="reg-mark">®</span> is looking forward to showcase U.
          </p>

          <p>
            If you or someone you know has a&nbsp;story to&nbsp;tell<br/>
            that fits any of these criteria,<br/>
            and also provide some collaborative value addition,<br/>
            do get in touch with us via <span style={{ color: '#D2691E', fontWeight: '700' }}>text</span> or <span style={{ color: '#D2691E', fontWeight: '700' }}>email</span> with your details.
          </p>

          <p>
            Someone from our team will reach out 2U<br/>
            to see if you are a good fit and can prove to be a&nbsp;compelling story to&nbsp;tell.<br/>
            In the process, showcasing and immortalizing you in the digital landscape.
          </p>
        </div>
      </div>
    </div>
  );
}

export default YouAFit;
