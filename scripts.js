function getMembers() {
  const Url="http://localhost:3000/members";
  $.ajax({
    url: Url,
    type: "GET",
    data: { key: 'value' },
    dataType: 'json',
    success: function(result) {
      console.log(result);
      let members = result.data;
      let avgPrice = 0;

      members.sort(function(item1, item2) {
        return item1.subscription.price < item2.subscription.price ? 1 : -1;
      });

      $(members).each(function(index, item) {
        avgPrice += item.subscription.price;
        createdAtDate = new Date(item.created_at);
        updatedAtDate = new Date(item.updated_at);

        $("#members-container").append(
          "<div class='card'>" +
            "<table class='table'>" +
              "<thead>" +
                "<h2>" + item.name + "</h2>" +
              "</thead>" +
              "<tbody>" +
                "<tr>" +
                  "<th>" + "ID" + "</th>" +
                  "<td>" + item.id + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Email" + "</th>" +
                  "<td>" + item.email + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Phone" + "</th>" +
                  "<td>" + item.phone + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Subscription Level" + "</th>" +
                  "<td>" + item.subscription.name + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Subscription ID" + "</th>" +
                  "<td>" + item.subscription.id + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Subscription Price" + "</th>" +
                  "<td>" + "$" + item.subscription.price.toFixed(2) + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Created" + "</th>" +
                  "<td>" + createdAtDate.toLocaleDateString() + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<th>" + "Updated" + "</th>" +
                  "<td>" + updatedAtDate.toLocaleDateString() + "</td>" +
                "</tr>" +
              "</tbody>" +
            "</table>" +
          "</div>"
        );
      });
      $("#avg-price").append((avgPrice/members.length).toFixed(2))
    },
    error: function(error) {
      console.log(`Error ${error}`);
    }
  })
}

$(function() {
  getMembers();
})

