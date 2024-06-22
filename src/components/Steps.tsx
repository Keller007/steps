import { useState } from "react";
import "./Steps.css";
import { DistanceData } from "../interface";

const Steps: React.FC = () => {
  const [distanceData, setDistanceData] = useState<DistanceData[]>([]);
  const [newDistanceDate, setNewDistanceDate] = useState<string>("");
  const [newDistanceValue, setNewDistanceValue] = useState<number | "">("");

  const handleDistanceDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDistanceDate(event.target.value);
  };

  const handleDistanceValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDistanceValue(Number(event.target.value));
  };

  const handleAddDistance = () => {
    if (newDistanceDate && newDistanceValue) {
      const existingDistance = distanceData.find(
        (distance) => distance.date === newDistanceDate
      );
      const updatedDistanceData = existingDistance
        ? [...distanceData].map((distance) =>
            distance.date === newDistanceDate
              ? { ...distance, distance: distance.distance + newDistanceValue }
              : distance
          )
        : [...distanceData, { date: newDistanceDate, distance: newDistanceValue }];
      setDistanceData(updatedDistanceData);
      setNewDistanceDate("");
      setNewDistanceValue("");
    }
  };

  const handleRemoveDistance = (index: number) => {
    const updatedDistanceData = distanceData.filter((_, i) => i !== index);
    setDistanceData(updatedDistanceData);
  };

  const sortedDistanceData = [...distanceData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddDistance();
    }
  };

  return (
    <div>
      <div className="title">
        <h4>Дата (ДД.ММ.ГГГГ)</h4>
        <h4>Пройдено км</h4>
      </div>
      <form className="input">
        <input
          className="input-box"
          type="text"
          value={newDistanceDate}
          onChange={handleDistanceDateChange}
          onKeyDown={handleKeyDown}
        />
        <input
          className="input-box"
          type="number"
          step="0.1"
          value={newDistanceValue}
          onChange={handleDistanceValueChange}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" type="button" onClick={handleAddDistance}>
          Добавить
        </button>
      </form>
      <div className="title-result">
        <div>Дата (ДД.ММ.ГГГГ)</div>
        <div>Пройдено км</div>
        <div>Действия</div>
      </div>
      <div className="output">
        {sortedDistanceData.map((item, index) => (
          <div className="resultItem" key={index}>
            <span>{item.date}</span>
            <span>{item.distance}</span>
            <div>
              <span>✎</span>
              <span
                className="remove"
                onClick={() => handleRemoveDistance(index)}
              >
                ✘
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
