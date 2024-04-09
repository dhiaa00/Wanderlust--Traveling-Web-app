import "./dayTimeline.css";
import { useInView } from "react-intersection-observer";

function DayTimeline() {
  const { ref, inView } = useInView();

  return (
    <div className=" section  p-4  ">
      <div className="flex relative min-h-full flex-col   w-full  items-center justify-center">
        <div className={` ${inView ? "event" : "hidden"} flex flex-col gap-4`}>
          <h2 className="event .text-[E6F4F3] tracking-wide text-4xl text-center">
            september
          </h2>
        </div>
        <div ref={ref}></div>
        <div className="flex w-full  items-center justify-center">
          <table className="table-auto  text-white mt-3 ">
            <thead>
              <tr className={`${inView ? "tr" : "hidden"}`}>
                <th className={`${inView ? "th" : "hidden"}`}>
                  <p>sun</p>
                </th>
                <th className={`${inView ? "th" : "hidden"}`}>
                  <p>mon</p>
                </th>
                <th className={`${inView ? "th" : "hidden"}`}>
                  <p>tue</p>
                </th>
                <th className={`${inView ? "th" : "hidden"}`}>
                  <p>wed</p>
                </th>
                <th className={` ${inView ? "th" : "hidden"}`}>
                  <p>thu</p>
                </th>
                <th className={`${inView ? "th" : "hidden"}`} initial="hidden">
                  <p>fri</p>
                </th>
                <th className={`${inView ? "th" : "hidden"}`} initial="hidden">
                  <p>sat</p>
                </th>
                <th
                  className={`${
                    inView ? "th" : "hidden"
                  } before:top-[20%]`}></th>
              </tr>
            </thead>

            <tbody>
              <tr className={`${inView ? "tr" : "hidden"}`}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>2</p>
                </td>
              </tr>
              <tr className={`${inView ? "tr" : "hidden"}`}>
                <td>
                  <p>3</p>
                </td>
                <td>
                  <p>4</p>
                </td>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>6</p>
                </td>
                <td>
                  <p>7</p>
                </td>
                <td>
                  <p>8</p>
                </td>
                <td>
                  <p>9</p>
                </td>
              </tr>
              <tr className={`${inView ? "tr" : "hidden"}`}>
                <td>
                  <p>10</p>
                </td>
                <td>
                  <p>11</p>
                </td>
                <td className="date">
                  <p>12</p>
                </td>
                <td>
                  <p>13</p>
                </td>

                <td>
                  <p> 14</p>
                </td>

                <td>
                  <p>15</p>
                </td>
                <td>
                  <p>16</p>
                </td>
              </tr>
              <tr className={`${inView ? "tr" : "hidden"}`}>
                <td>
                  <p>17</p>
                </td>
                <td>
                  <p>18</p>
                </td>
                <td>
                  <p>19</p>
                </td>
                <td>
                  <p>20</p>
                </td>
                <td>
                  <p>21</p>
                </td>
                <td>
                  <p>22</p>
                </td>
                <td>
                  <p>23</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DayTimeline;
