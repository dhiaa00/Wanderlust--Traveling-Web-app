import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

const SenderInfo = ({ sender }) => {
  return (
    <div className="sender-info">
      <Suspense fallback={<CircularProgress />}>
        {sender.username ? (
          <div className="sender-info-container">
            <img
              src={sender.profilePhoto}
              alt="sender"
              className="sender-info-img"
            />
            <div className="sender-info-text">
              <div className="sender-info-text-item">
                <h3>Username</h3>
                <p>{sender.username}</p>
              </div>
              <div className="sender-info-text-item">
                <h3>Email</h3>
                <p>{sender.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-sender-selected">
            <h2
              style={{
                color: "#333",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
              }}>
              No Sender Selected
            </h2>
            <p
              style={{
                color: "#333",
                fontWeight: "bold",
                textAlign: "center",
              }}>
              Select a sender to view their info here
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SenderInfo;
