import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import data from "../files/metadata.json";
import { useState } from "react";

const Home: NextPage = () => {
  const centerSelect = function () {
    window.removeEventListener("scroll", centerSelect, false);
    // https://webcache.googleusercontent.com/search?q=cache:y0eKs6uI1JYJ:https://into-the-program.com/javascript-add-class-on-scroll/&cd=2&hl=ja&ct=clnk&gl=jp
    const target = document.getElementsByClassName("scrollt");
    const w_height = window.innerHeight;
    // console.log(w_height);
    const position = w_height / 2;
    for (let i = 0; i < target.length; i++) {
      const clientRect = target[i].getBoundingClientRect();
      // target[i].innerHTML = clientRect.top;
      if (clientRect.top < position && clientRect.bottom > position) {
        console.log(clientRect.top);
        target[i].classList.add("bg-[#ff55ab]");
      } else {
        target[i].classList.remove("bg-[#ff55ab]");
      }
      if (true) {
        target[i].classList.add("scrollt");
      } else {
        target[i].classList.remove("scrollt");
      }
      window.addEventListener("scroll", centerSelect, false);
    }
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
      <Head>
        <title>プロセカ運指研究所</title>
        <meta
          name="description"
          content="自分に合った運指を見つけよう。譜面化・手の再現動画も作れます！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-3/5">
        {data.map((x) => {
          return (
            <div
              className="scrollt scrollt2 bg-[#68607f] h-16 border-y flex"
              id="songlist"
              key={x.title}
            >
              <p className="rounded-full bg-[#434365] text-[#39daca] w-10 h-10 text-center text-md">
                <Getlevel title={x.title} />
              </p>
              <p className="text-[#edeaff] ml-2">{x.title}</p>
            </div>
          );
        })}
      </div>
      <div className="w-2/5 fixed right-0 top-0 bg-[#f5d0d7] h-full z-10">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setl("easy")}
            className="rounded-full bg-white w-12 h-12 border-[#e2e2eb] border-[3px] outline outline-1 outline-[#5c545e]"
          >
            EASY
          </button>
          <button
            onClick={() => setl("normal")}
            className="rounded-full bg-white w-12 h-12 border-[#e2e2eb] border-[3px] outline outline-1 outline-[#5c545e]"
          >
            NORMAL
          </button>
          <button
            onClick={() => setl("hard")}
            className="rounded-full bg-white w-12 h-12 border-[#e2e2eb] border-[3px] outline outline-1 outline-[#5c545e]"
          >
            HARD
          </button>
          <button
            onClick={() => setl("normal")}
            className="rounded-full bg-white w-12 h-12 border-[#e2e2eb] border-[3px] outline outline-1 outline-[#5c545e]"
          >
            EXPERT
          </button>
          <button
            onClick={() => setl("master")}
            className="rounded-full bg-white w-12 h-12 border-[#e2e2eb] border-[3px] outline outline-1 outline-[#5c545e]"
          >
            MASTER
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
