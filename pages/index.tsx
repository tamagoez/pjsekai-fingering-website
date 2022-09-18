import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import data from "../files/metadata.json";
import { useState } from "react";

const Home: NextPage = () => {
  let cSId: any = undefined;
  let timeoutId: any = undefined;
  const [songtitle, setsongtitle] = useState("");

  function actioncs() {
    document.getElementById("focusbar")!.classList.add("displaynone")
    // https://webcache.googleusercontent.com/search?q=cache:y0eKs6uI1JYJ:https://into-the-program.com/javascript-add-class-on-scroll/&cd=2&hl=ja&ct=clnk&gl=jp
    const target = document.getElementsByClassName("scrollt");
    const w_height = window.innerHeight;
    const position = w_height / 2;
    for (let i = 0; i < target.length; i++) {
      target[i].classList.remove("songfocus");
      const clientRect = target[i].getBoundingClientRect();
      if (clientRect.top < position && clientRect.bottom > position) {
        // console.log(target[i].children[1].innerHTML);
        setsongtitle(target[i].children[2].innerHTML);
        target[i].classList.add("songfocus");
      }
      cSId = undefined;
    }
  }
  const centerSelect = function () {
    document.getElementById("focusbar")!.classList.remove("displaynone")
    document.getElementsByClassName("songfocus")[0]?.classList.remove("songfocus");
    timeoutId = undefined;
    window.removeEventListener("scroll", centerSelect, false);
    clearTimeout(cSId);
    cSId = setTimeout(actioncs, 20);
    window.addEventListener("scroll", centerSelect, false);
  };
  //スクロールイベントリスナーに登録
  if (typeof window !== "undefined")
    window.addEventListener("scroll", centerSelect, false);
  //setTimeout(() => {
  //  const target = document.getElementsByClassName("scrollt2");
  //  for (let i = 0; i < target.length; i++) {
  //    target[i].classList.add("scrollt");
  //  }
  //}, 100);

  const [selectl, setl] = useState("master");
  function Getlevel({ title }: { title: string }) {
    const finded = data.find((v) => v.title === title);
    let returnl;
    if (selectl === "master") {
      returnl = finded!.masterl;
    }
    if (selectl === "expert") {
      returnl = finded!.expertl;
    }
    if (selectl === "hard") {
      returnl = finded!.hardl;
    }
    if (selectl === "normal") {
      returnl = finded!.normall;
    }
    if (selectl === "easy") {
      returnl = finded!.easyl;
    }
    return <>{returnl}</>;
  }
  return (
    <>
      <style jsx>{`
        .songfocus {
          background-color: #ff55ab;
          z-index: 10;
          height: 85px;
        }

        .focusbar {
          /* background-color: #ff55ab; */
          position: fixed;
          top: calc(50% - 35px);
          left: 0%;
          width: 60%;
          height: 70px;
          z-index: 0;
        }

        .focusbar img {
          width: 100%;
          height: 100%;
        }

        .displaynone {
          display: none;
        }

        .zi-20 {
          z-index: 20;
        }

        #songlist {
          display: flex;
          align-items: center;
        }

        .levelbase {
          border-radius: 50%;
          background-color: #434365;
          color: #39daca;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 29px;
          font-size: 18px;
        }

        .pjsekai-level {
          position: fixed;
          bottom: 80px;
        }

        .levelselect {
          border-radius: 50%;
          width: 55px;
          height: 55px;
          border: 3px solid #e2e2eb;
          outline: 1px solid #5c545e;
          text-align: center;
          letter-spacing: -0.5px;
          padding: auto;
          font-size: 13px;
        }

        .expert {
          background-color: #d3aba2;
        }

        .pjsekai-submit {
          width: 220px;
          height: 55px;
          text-align: center;
          background: linear-gradient(#34edbf, #06fff6);
          border-radius: 5px;
          outline: 2.5px solid #504d68;
          border: 5px solid #f4f6f8;
          font-size: 20px;
          position: fixed;
          bottom: 10px;
          right: 10px;
        }
      `}</style>
      <Head>
        <title>プロセカ運指研究所</title>
        <meta
          name="description"
          content="自分に合った運指を見つけよう。譜面化・手の再現動画も作れます！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="focusbar displaynone" id="focusbar"><img src="selectwave-unscreen.gif" /></div>
      <div className="w-3/5">
        {data.map((x) => {
          return (
            <div
              className="scrollt scrollt2 bg-[#645f7d] h-[60px] border-y-[0.1px] flex"
              id="songlist"
              key={Math.random()}
            >
              <div className="pl-2" />
              <p className="levelbase">
                <Getlevel title={x.title} />
              </p>
              <p className="text-[#edeaff] ml-2">{x.title}</p>
            </div>
          );
        })}
      </div>
      <div className="w-2/5 fixed right-0 top-0 bg-[#c2ecfa] h-full z-10">
        <p>{songtitle}</p>
        <div className="flex gap-4 flex-wrap pjsekai-level">
          <button
            onClick={() => { setl("easy"); setTimeout(actioncs, 100); }}
            className={selectl === "easy" ? 'levelselect bg-[#68dc1c] text-white' : 'levelselect bg-white'}
          >
            EASY
          </button>
          <button
            onClick={() => { setl("normal"); setTimeout(actioncs, 100); }}
            className={selectl === "normal" ? 'levelselect bg-[#30bcf1] text-white' : 'levelselect bg-white'}
          >
            NORMAL
          </button>
          <button
            onClick={() => { setl("hard"); setTimeout(actioncs, 100); }}
            className={selectl === "hard" ? 'levelselect bg-[#ffb00e] text-white' : 'levelselect bg-white'}
          >
            HARD
          </button>
          <button
            onClick={() => { setl("expert"); setTimeout(actioncs, 100); }}
            className={selectl === "expert" ? 'levelselect bg-[#fd416f] text-white' : 'levelselect bg-white'}
          >
            EXPERT
          </button>
          <button
            onClick={() => { setl("master"); setTimeout(actioncs, 100); }}
            className={selectl === "master" ? 'levelselect bg-[#ba33ed] text-white' : 'levelselect bg-white'}
          >
            MASTER
          </button>
        </div>
        <button className="pjsekai-submit">決定</button>
      </div>
    </>
  );
};

export default Home;
