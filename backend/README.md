# Docker 使用說明

## Prerequisites

- [安裝 Docker](https://www.docker.com/)

## Getting started

移動至目錄 backend `cd 'your path to root'\Quick-Parking-25\backend`

### 方法一：build docker image

1. 執行指令 `docker bulid -t 'your docker image name' .` build 出 docker image

   * -t 為選項，用途為要不要幫此 image 取一個 tag 名稱
   * 'your docker image' 為你想要幫此 docker image 取的 tag 名字，用途為方便使用，沒有的話則只能使用 id 來選定此 image
     1. 推薦使用 'quick-parking-backend'
2. 執行指令 `docker run -d -p 'port':5000 'image name'` 來使用 image 開啟 container

   * -d 為選項，使用後在 docker 運行時會將 terminal 交還給你，否則 terminal 會顯示 docker 的內容
   * -p 為選項，使用後可以指定 port 對應，下一個參數接 `'your port':'docker port'`
     * `'your port'` 為此應用要啟在你電腦本地端的 port
       * 推薦使用 4000
     * `'docker port'` 為此應用在 docker container 中的 port
       * 推薦使用 5000
     * '`image name'` 為要使用之 image tag 名稱或是 id, 使用剛剛 build 時取的名稱即可

> 註：使用使方法開啟後，每次有更改程式碼都需要重新 build 一次再啟動才會更新，因此較不建議

### 方法二：docker compose（建議使用）

1. 執行指令 `docker-compose up --build` 來 build 出 image
   * `up` 為 upgrade，因此使用此方法後程式碼若有改動，docker-compose 也會跟著改動，不需要重新 build
   * 此方法將 docker build 所需要之參數以及指令都寫在 `docker-compose.yaml` 中
     * 預設 build 出之 image tag 為 'quick-parking-backend'
     * 預設之本機 port 為 4000
     * 預設之 docker container port 為 5000
2. 除了初次使用需要 `--build` 之外，後續使用都只要 `docker-compose up` 即可

## 新增 package 方法

### Virtual Environment

為了只安裝需要的 packages 而不裝到其他東西，必須開啟一個乾淨的環境來使用

1. 移動至目錄 backend `cd 'your path to root'\Quick-Parking-25\backend`
2. 在此目錄底下創建 virtual environment： 執行 `python -m venv venv`

   * 這個指令會在此目錄底下開一個資料夾 venv，裡面裝有該環境的所有 packages
   * 該資料夾應該被 .gitignore 列入
3. 開啟 virtual environment，執行以下指令

   * mac/linux: `source venv/bin/activate`
   * windows: `.\venv\Scripts\activate`
     執行指令會切換至該虛擬環境
4. 下載目前所有使用的 packages：在 venv 中執行 `pip install -r requirements.txt`
5. 安裝想要使用的 packages：在 venv 中執行 `pip install 'package name'`

   * `'package name'` 為要安裝之 package 名稱
6. 將所有使用的 package 名稱以及版本寫入 `requirements.txt`：在 venv 中執行 `pip freeze > requirements.txt`
7. 將更動推上 GitHub

   > 步驟 2 為沒有使用過 venv 之步驟，除了第一次使用後續皆可跳過。步驟 4 則視其他人有沒有新增 package 而定，若不確定則建議執行。
   >
