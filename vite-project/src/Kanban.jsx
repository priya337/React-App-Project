import React, { useState } from "react";
import KanbanListData from "../kanban.json";

function KanbanList() {
  const [KanbanList] = useState(KanbanListData);
  return (
    <>
      <ul>
        {KanbanList.map((list) => {
          const isCompleted = list.status === "Done";
          return (
            <li key={list.id}>
              <h2>{list.title}</h2>
              <p>{list.description}</p>
              <h3>{list.assignee}</h3>
              <p>
                {list.status}
                {""}
                {isCompleted ? "✅" : "❌"}
              </p>
              <h2>{list.priority}</h2>
              <p>{list.createdDate}</p>
              <p>{list.dueDate}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default KanbanList;
