"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockData } from "@/data/mockdata"; // mockDataをインポート
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// forestPromptをmockDataから取得
const forestPrompt = mockData.forestPrompt;

// 計算結果を生成する関数を定義
const generateTestOutput = mockData.generateTestOutput; // mockDataから取得

export default function PromptCreation({ params }: { params: { id: string } }) {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState(""); // useStateを追加
  const router = useRouter();

  useEffect(() => {
    setGeneratedPrompt(forestPrompt); // モックデータを使用
  }, []);

  const handlePromptEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeneratedPrompt(e.target.value);
  };

  const handleBackToEdit = () => {
    console.log("編集に戻る");
    const id = params.id; // 受け取ったIDを使用
    try {
      router.push(`/dashboard/${id}/edit`);
    } catch (error) {
      console.error("ルーティングエラー:", error);
    }
  };

  const handleExecutePrompt = async () => {
    setTestOutput(generateTestOutput); // 新しい関数を呼び出す
  }; // ここにセミコロンを追加

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">プロンプト作成と検証</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <label
              htmlFor="generatedPrompt"
              className="block text-lg font-semibold mb-2">
              生成されたプロンプト
            </label>
            <Textarea
              id="generatedPrompt"
              value={generatedPrompt}
              onChange={handlePromptEdit}
              className="w-full min-h-[200px]"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <label
              htmlFor="testInput"
              className="block text-lg font-semibold mb-2">
              データ入力
            </label>
            <Textarea
              id="testInput"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="データを入力してください"
              className="w-full min-h-[100px]"
            />
          </div>
          <div className="flex justify-between gap-4">
            <Button
              onClick={handleBackToEdit}
              variant="outline"
              className="w-1/2">
              編集に戻る
            </Button>
            <Button onClick={handleExecutePrompt} className="w-1/2">
              プロンプトを実行
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex-grow flex flex-col">
            <h2 className="text-lg font-semibold mb-2">実行結果</h2>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex-grow overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="min-h-full">
                {testOutput ? (
                  <pre className="whitespace-pre-wrap">{testOutput}</pre>
                ) : (
                  "まだ結果はありません。"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
