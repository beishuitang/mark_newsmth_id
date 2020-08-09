<script>
export default {
  props: ["frameConfig"],
  name: "BotFoot",
};
</script>

<style>
/* html {  word-break: break-word;} */
#html,
#html_body,
#html #html_body * {
  font-size: 1rem;
  line-height: unset;
  height: unset;
  width: unset;
  max-width: 100% !important;
}
#html #menu *,
#html #mp_wrapper div,
#html #mp_wrapper ul {
  float: unset;
}
.webkit-line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

#html #html_body samp {
  width: 1rem;
  height: 1rem;
}
/* #top_head #top_menu {
  float: right;
} */
#html #main {
  margin: unset;
}
#html #main #body {
  margin-bottom: 0.5rem;
}
#html #bot_logo {
  text-align: center;
}
#html #bot_info {
  padding: 0rem 2rem;
}
#html #bot_logo img {
  border: unset;
}
#html #html_body .hidden_item {
  display: none;
}
#html #html_body #menu {
  padding: 0.3rem;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: white;
  max-height: 100%;
  overflow-y: scroll;
}
#html #left_line samp {
  right: 0;
}
#html #html_body .toggler {
  height: 12px;
  width: 12px;
  display: inline-block;
}
#html #html_body .x-folder,
#html #html_body .x-leaf {
  height: 2rem;
  line-height: 2rem;
}
#html .leaf-last samp,
#html .leaf samp {
  vertical-align: text-top;
}
#html #u_login {
  padding: 0.5rem 0;
}
#html #menu #u_login .u-login-input input {
  width: 5rem;
}
#html #menu .u-login-op .submit {
  margin: 0 -2px 0 22px;
}
#html .u-login-check {
  padding-left: 0.4rem;
}
#html #menu #b_search {
  width: 5rem;
  height: 1rem;
  margin: 0;
  margin-right: 1rem;
}
#html #main #body #top10 h3 {
  height: 30px;
}
#html .tg_href {
  padding: 1rem;
}
#html .cur {
  text-align: center;
}
#html #hotspot .topics {
  border: unset;
}
#html #main .acts div {
  text-align: center;
  display: inline-block;
}
#html #pictures div ul {
  display: flex;
  overflow-x: scroll;
}
#html #pictures div ul li img {
  border: double;
  display: inline-block;
  width: 192px;
  height: 144px;
}
#html #pictures div ul li a {
  display: inline-block;
  width: 192px;
}
#html #ranking ul {
  background-size: 1rem auto;
}
#html .a-left {
  display: none;
}
#html .a-u-sex {
  margin-right: unset;
}
#html .a-u-sex,
#html .a-u-name,
#html .a-func,
#html .page {
  float: unset;
}
#html #main .likes {
  margin: unset;
}
#html #main #body .b-head .n-right,
#html #main #body .a-pos,
#html #main #body .a-back {
  padding-top: unset;
}
#html #main #body .article {
  width: 100%;
}
#html #main #body #quick_reply {
  width: 100%;
}
#html #main #body #quick_submit {
  width: 5rem;
}
#html #html_body textarea {
  height: 5rem;
  width: 98%;
}
#html #html_body .post-title {
  width: 98%;
}
#html .post-list {
  padding: unset;
}
#html #main .b-right-m {
  text-align: unset;
  padding-left: unset;
}
#html #html_body table .a-u-name {
  margin: unset;
}
#html #form_add_like input {
  width: 98%;
}
#html #html_body .u-info dt {
  line-height: 2rem;
}
#html #html_body .u-info figure {
  margin-right: 1rem;
}
#html #html_body .u-info dd {
  line-height: 2rem;
}
#html #html_body .board-list.corner .title_1 {
  text-align: center;
}
#html #html_body .board-list.corner .title_4 {
  text-align: center;
}
</style>
