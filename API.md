## 1인개발자 LR의 IT블로그 API 가이드

### Base URL

```
https://api.dev-lr.com
```

### API Functions Summary

| Function | Description | Parameters |
|---|---|---|
| /getPostData | Get Specific Post Data | PostID, PostType |
| /getPostImage | Get Specific Image that is Encoded with Base64 | PostID, PostType, SrcID |
| /getPostList | Get Specific Post List Array | PostType |

## Common Description

### Parameter / Variable

| Variable | Type | Description | Example |
|---|---|---|---|
| Post Content | String | Post Content written with Markdown | #Hello! |
| Post Date | String | Post Date | Jul 15, 2022 |
| Post ID | String | Post ID that used on URL Parameter | 00026 |
| Post IsPinned | Boolean | Post is Pinned or Not | true |
| Post Tag | String Array | Array with Post Tag Items | ["openvpn", "odroid"] |
| Post Title | String | Post Title | Open VPN 구축으로 외부에서 내부망 접근하기 |
| Post URL | String | URL for Load Data from Server | 220715-openvpn-install |

### Result Values

| Variable | Type | Description |
|---|---|---|
| RESULT_CODE | Integer | 200 : OK / 100 : Error |
| RESULT_MSG | String | Message for Result Check |
| RESULT_DATA | Object | Values of API Function |


## Detail Description

### /getPostData

Input Body
```json
{
    "postID": POST_ID,
    "postType": POST_TYPE
}
```

Response Body
```json
{
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
        "postContent": POST_CONTENT,
        "postDate": POST_DATE,
        "postIsPinned": POST_IS_PINNED,
        "postTag": POST_TAG,
        "postTitle": POST_TITLE,
        "postURL": POST_URL,
    }
}
```

---

### /getPostImage

Input Body
```json
{
    "postID": POST_ID,
    "postType": POST_TYPE,
    "srcID": SRC_ID
}
```

Response Body
```json
{
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
        "ImageData": IMAGE_DATA_BASE64
    }
}
```

---

### /getPostList

Input Body
```json
{
    "postType": POST_TYPE
}
```

Response Body
```json
{
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
        "postCount": 1,
        "postList": [
            {
                "postDate": POST_DATE,
                "postID": POST_ID,
                "postIsPinned": POST_IS_PINNED,
                "postTag": POST_TAG,
                "postTitle": POST_TITLE,
                "postURL": POST_URL,
            }
        ]
    }
}
```