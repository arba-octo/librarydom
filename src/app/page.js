"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import LineSeparate from "@/components/LineSeparate";
import Books from "@/components/Books/Books";

export default function Home() {
  return (
      <Provider store={store}>
          <div className="App">
              <Header/>
              <LineSeparate/>
              <div className="section content">
                  <SideBar/>
                  <Books/>
              </div>
          </div>
      </Provider>
  );
}