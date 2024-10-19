"use client";

import {
  PanelRightClose,
  PanelRightOpen,
  Printer,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "こんにちは！どのようなお手伝いができますか？" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [markdownContent, setMarkdownContent] = useState(
    "# ようこそ\n\nここにマークダウンコンテンツが表示されます。"
  );
  const [isMarkdownVisible, setIsMarkdownVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { sender: "user", content: inputMessage }]);
      setInputMessage("");

      // ここで実際のチャットボットの応答を処理します
    }
  };

  const toggleMarkdownVisibility = () => {
    setIsMarkdownVisible(!isMarkdownVisible);
  };

  const handlePrint = () => {
    const printContent = document.createElement("div");
    printContent.innerHTML =
      document.querySelector(".markdown-preview")?.innerHTML || "";
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
          <title>印刷プレビュー</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            /* 必要に応じて追加のスタイルを記述 */
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* チャットセクション */}
      <div
        className={`flex-grow p-4 flex flex-col transition-all duration-300 ease-in-out ${
          isMarkdownVisible ? "w-1/2" : "w-full"
        }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">チャット</h2>
          {!isMarkdownVisible && (
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={toggleMarkdownVisibility}>
              <PanelRightOpen size={20} />
              <span className="sr-only">マークダウンを表示</span>
            </button>
          )}
        </div>
        <div className="flex-grow mb-4 border rounded-lg p-4 overflow-y-auto bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}>
              <div
                className={`flex items-start ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}>
                <div
                  className={`rounded-full p-2 ${
                    message.sender === "user" ? "bg-blue-500" : "bg-gray-300"
                  }`}>
                  <User
                    size={24}
                    className={
                      message.sender === "user" ? "text-white" : "text-gray-600"
                    }
                  />
                </div>
                <div
                  className={`mx-2 p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="メッセージを入力..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
            <Send size={18} />
            <span className="sr-only">送信</span>
          </button>
        </div>
      </div>

      {/* マークダウンセクション */}
      <div
        className={`p-4 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isMarkdownVisible ? "w-1/2" : "w-0"
        }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">マークダウン</h2>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={handlePrint}>
              <Printer size={20} />
              <span className="sr-only">印刷</span>
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={toggleMarkdownVisibility}>
              <PanelRightClose size={20} />
              <span className="sr-only">マークダウンを非表示</span>
            </button>
          </div>
        </div>
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="flex mb-2">
            <button
              className={`px-4 py-2 ${
                activeTab === "edit"
                  ? "bg-white text-blue-500 border-t border-l border-r rounded-t-lg"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("edit")}>
              編集
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "preview"
                  ? "bg-white text-blue-500 border-t border-l border-r rounded-t-lg"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("preview")}>
              プレビュー
            </button>
          </div>
          {activeTab === "edit" ? (
            <textarea
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              className="w-full h-full resize-none p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="マークダウンを入力..."
            />
          ) : (
            <div className="h-full border rounded-lg p-4 overflow-y-auto bg-white markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
