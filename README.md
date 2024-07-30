An integrated monitoring solution combining Elasticsearch, Fluentd, Kibana (EFK stack) with Heartbeat for comprehensive system and service health tracking.

* ### 執行方法
    第一次執行的話執行 `docker-compose build && docker-compose up -d`，之後就都使用 `docker-compose up -d` 即可。
* ### 實作內容
    1. 建立 EFK 環境（Elasticserach, Fluentd, Kibana）
    2. 用 `Node.js` 和 `Express` 框架開一些模擬的 API
    3. 設定 Heartbeat 對 API 進行監控，可透過 Kibana 視覺化成果

* ### 教學指引
    * 在 `heartbeat.yml` 中可設定要監控的內容，一一列在 `heartbeat.monitors` 這項下面，主要內容包括：
        1. `type`：要監控的方法，比如 `tcp`, `http` 以及 `ICMP` 等等。
        2. `name`：這個監控的名字，會在 log 中顯示，幫助識別特定的監控。
        3. `host` 或是 `urls`：要監控的服務位置，注意要改成在 Docker 中設定的服務名稱。
        4. `schedule`：監控的頻率，例如 `@every 10s` 就是每 10 秒去打一次這支 API 確認他的狀態。
        5. `check.response`：可自由定義應回傳的值。
        6. `tags`：幫監控加上標籤，可以在 filter log 時更方便。
    * 在 `docker-compose.yml` 中，要確保 Heartbeat 是在 Elasticsearch 和 Kibana 之後啟動，可透過 `depends_on` 屬性來設定。
* ### 觀察方法
    * 在 Uptime 分頁中，可以看到所有監控中服務的狀態，都沒問題的話就會像下圖這樣都是灰色，服務異常的話就會有紅色的標示出現。
    ![image](https://hackmd.io/_uploads/S1gkmbLKA.png)
        * Ping over time 是指過去一段時間內呼叫所有列表中 API 的狀態，包含共打了幾次、幾次成功和幾次失敗。
        * 底下則列出各服務的資訊，包含名稱、實際位置以及標籤等等，也可以在這邊開啟警報，讓 Kibana 在服務發生異常時主動通知。
    * 點進監控中服務後就可以看到關於此服務更詳細的監控資訊。
    ![image](https://hackmd.io/_uploads/SkbRUWIFC.png)
        * 主要資訊，包含這組監控在指定時間之內的可用性、類型、URL 以及測試類型等資訊。
        * Monitor duration：列出 Heartbeat 所收到的回應時間，可觀察是否有特定地區或是時段的延遲時間特別久。
        * Pings over time：在每個時段中發送多少次請求，也可以看出錯誤的比例，有錯誤的話同樣也會以紅色顯示。

        ![image](https://hackmd.io/_uploads/S1KkwWIYA.png)
        * History：會詳細列出每一次 Ping 的結果，包含結果是否正常、檢查的時間、從什麼地方執行、HTTP status，花了多少時間等等，如果有錯誤的話，也會記錄錯誤的內容是什麼。

