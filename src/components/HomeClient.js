import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import LineSeparate from "@/components/LineSeparate";
import Books from "@/components/Books/Books";

export default function HomeClient({ books }) {


    return (
        <div>
            <Header books={books} />
            <LineSeparate />
            <div className="section content">
                <SideBar />
                <Books />
            </div>
        </div>
    );
}