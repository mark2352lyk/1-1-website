require("dotenv").config();
const express = require("express");
const path = require("path");
const supabase = require('./db');


const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../frontend/views"));

app.get('/test-picture-post', async (req, res) => {
    const { data, error } = await supabase
    .from('picture_post')
    .select('*')
    .limit(1);
    
    if (error) {
        console.error('❌ 오류:', error.message);
        return res.status(500).send('Supabase 연결 실패: ' + error.message);
    }
    
    console.log('✅ 연결 성공:', data);
    res.send('Supabase 연결 성공: ' + JSON.stringify(data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));