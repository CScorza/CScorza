<%!
 public static int accesses = 0;
%>
<h1>JSP Example (jspcount.jsp)</h1>
<%
  accesses++;
  out.print("<p>Number of times this JSP has been accessed:" + accesses + "</p>");
%>