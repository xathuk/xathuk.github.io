// Username
let username = 'thuk 👽';

document.getElementById('username').innerHTML = username;

// socket >>>

function theOne() {
    var connection = new WebSocket("wss://api.lanyard.rest/socket");
    var int;

    connection.onmessage = (event) => {
        var data = JSON.parse(event.data);
        var op = data.op;
        if (op == 1) {
            int = setInterval(
                () =>
                connection.readyState == connection.OPEN &&
                connection.send(JSON.stringify({
                    op: 3
                })),
                data.d.heartbeat_interval
            );
            connection.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: "680810186545561636",
                    },
                })
            );
        } else if (data.op == 0) {
            // online status 
            if (data.d.discord_status === 'dnd') {
                document.getElementById('userAvatar').innerHTML = `<img src='https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512' style="border:#f04747 3px solid;" class="xp_profile_img" draggable=false>`;
            } else {
                if (data.d.discord_status === 'idle') {
                    document.getElementById('userAvatar').innerHTML = `<img src='https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512' style="border:#faa61a 3px solid;" class="xp_profile_img" draggable=false>`;
                } else {
                    if (data.d.discord_status === 'online') {
                        document.getElementById('userAvatar').innerHTML = `<img src='https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512' style="border:#43b581 3px solid;" class="xp_profile_img" draggable=false>`;
                    } else {
                        if (data.d.discord_status === 'offline') {
                            document.getElementById('userAvatar').innerHTML = `<img src='https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512' style="border:#cccccc 3px solid;" class="xp_profile_img" draggable=false>`;
                        }
                    }
               }
            }

            if (data.d.discord_status === 'dnd') {
                document.getElementById('onlineStatus').innerHTML = '<i class="fas fa-minus-circle fa-xs minha-margin" style="color:#f04747!important;"></i>&nbsp;Do not Disturb';
            } else {
                if (data.d.discord_status === 'idle') {
                    document.getElementById('onlineStatus').innerHTML = '<i class="fas fa-moon fa-xs-moon minha-margin fa-rotate-250" style="color:#faa61a!important;"></i>&nbsp;Idle';
                } else {
                    if (data.d.discord_status === 'online') {
                        document.getElementById('onlineStatus').innerHTML = '<i class="fas fa-circle fa-xs minha-margin" style="color:#43b581!important;"></i>&nbsp;Online';
                    } else {
                        if (data.d.discord_status === 'offline') {
                            document.getElementById('onlineStatus').innerHTML = '<i class="far fa-circle fa-xs minha-margin" style="color:#cccccc!important;"></i>&nbsp;Offline';
                        }
                    }
                }
            }

            //status >>>>>
            if (data.d.active_on_discord_desktop || data.d.active_on_discord_web || data.d.active_on_discord_mobile === true) {
                if (data.d.activities.length !== 0) {
                    if (data['d']['activities'][0]['type'] === 4) {
                        document.getElementById('status').innerHTML = `&nbsp;${data['d']['activities'][0]['state']}&nbsp;`;
                    } else {
                        document.getElementById('status').innerText = `No status 😵`;
                    }
                } else {
                    document.getElementById('status').innerText = `No status 😵`;
                }

            }
            if (data['d']['discord_status'] === 'offline') {
                document.getElementById('status').innerText = 'I\'m offline! 😵';
            }

            //spotify >>>>
            if (data.d.spotify === null) {
                document.getElementById('listeningto').innerHTML = ``
            }else {
                document.getElementById('listeningto').innerHTML = `<div class='card2'>
                <div style='display: flex;'>
                    <img src='https://img.xatblog.net/image/c8z4r9HsDjV.png' class='card-img' draggable=false>
                    <span class='card-title'>Listening to Spotify</span>
                </div>
                <p class='card-desc spotify-stronger'>
                    Artist: <span class="spotify-artist">${data.d.spotify.artist}</span>
                </p>
                <p class='card-desc spotify-stronger'>
                    Song: <span class="spotify-green">${data.d.spotify.song} 🎶🎶</span>
                </p>
            </div>`
            }
        }
    };

    connection.onclose = () => int && clearInterval(int);
}
theOne();